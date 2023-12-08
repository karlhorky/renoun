import parseTitle from 'title'
import type { ComponentType } from 'react'
import { kebabCase } from 'case-anything'
import { join, resolve } from 'node:path'
import { Node } from 'ts-morph'
import type { Directory, Symbol, ts } from 'ts-morph'
import type { getPropTypes } from '@tsxmod/utils'
import type { CodeBlocks } from './remark/add-code-blocks'
import type { Headings } from './remark/add-headings'
import { project } from './components/project'
import { getExportedPropTypes } from './utils/get-exported-prop-types'
import { getExamplesFromDirectory } from './utils/get-examples'

export type Module = {
  Content: ComponentType
  title: string
  summary: string
  headings: Headings
  codeBlocks: CodeBlocks
  pathname: string
  slug: string
  types:
    | {
        name: string
        slug: string
        path: string
        props: ReturnType<typeof getPropTypes>
      }[]
    | null
  examples:
    | {
        name: string
        slug: string
        pathname: string
        module: Promise<Record<string, any>>
      }[]
    | null
  metadata?: { title: string; description: string }
}

/**
 * Loads content and metadata related to MDX and TypeScript files.
 *
 * @example
 * export const allDocs = createDataSource('./docs/*.mdx', { baseDirectory: 'docs' })
 * export const allComponents = createDataSource('./components/**\/index.ts')
 */
export function createDataSource<Type>(
  /** A glob pattern to match files. */
  pattern: string,

  /** Options for configuring the data source. */
  options: {
    /** The base directory to use for calculating source paths. */
    baseDirectory?: string

    /** The base path to use for calculating navigation paths. */
    basePath?: string
  } = {}
) {
  let allModules = pattern as unknown as Record<
    string,
    Promise<{ default: any } & Record<string, any>>
  >

  if (typeof allModules === 'string') {
    throw new Error(
      'mdxts: createDataSource requires that the mdxts/loader package is configured as a Webpack loader.'
    )
  }

  const globPattern = options as unknown as string
  const { baseDirectory = '', basePath = '' } = (arguments[2] ||
    {}) as unknown as {
    baseDirectory: string
    basePath: string
  }

  /**
   * Analyze TypeScript source files.
   * TODO: compile MDX and analyze AST in ts-morph.
   */
  const sourceFiles = /ts(x)?/.test(globPattern)
    ? project.addSourceFilesAtPaths(globPattern)
    : null

  /** Merge in TypeSript source file paths and check if there's a matching MDX file */
  if (sourceFiles) {
    const indexFiles = new Map<Directory, Set<any>>()
    /** Turn paths back into original format from glob pattern. */
    const sourceFilePaths = sourceFiles
      .filter(
        /**
         * Filter out "private" modules not re-exported from the index file if present.
         * TODO: this should add a private field on the module object instead of filtering so the user can control.
         */
        (sourceFile) => {
          const directory = sourceFile.getDirectory()
          let exportedModules: Set<any> = indexFiles.get(directory)

          if (exportedModules === undefined) {
            exportedModules = new Set()

            const indexFile =
              directory.addSourceFileAtPathIfExists('index.ts') ||
              directory.addSourceFileAtPathIfExists('index.tsx')

            if (indexFile) {
              indexFile.getExportedDeclarations().forEach((declarations) => {
                for (const declaration of declarations) {
                  exportedModules.add(declaration.getSourceFile().getFilePath())
                }
              })
            }

            indexFiles.set(directory, exportedModules)
          }

          /** Check if there are any exported declarations that have a private JSDoc tag. */
          sourceFile.getExportedDeclarations().forEach((declarations) => {
            for (const declaration of declarations) {
              const symbol = declaration.getSymbol()
              const implementation = getImplementation(symbol)
              const isPrivate = hasPrivateTag(implementation)

              if (isPrivate) {
                exportedModules.delete(sourceFile.getFilePath())
              }
            }
          })

          return exportedModules.has(sourceFile.getFilePath())
        }
      )
      .map((sourceFile) => {
        const filePath = sourceFile.getFilePath()

        return filePath.replace(
          resolve(process.cwd(), baseDirectory),
          baseDirectory
        )
      })
    allModules = {
      ...allModules,
      ...Object.fromEntries(
        sourceFilePaths.map((filePath) => {
          const mdxPath = resolve(
            process.cwd(),
            filePath.replace(/\.tsx?$/, '.mdx')
          )
          const moduleKey = Object.keys(allModules).find((key) => {
            const resolvedKey = resolve(process.cwd(), key)
            return resolvedKey === mdxPath
          })
          const mdxModule = allModules[moduleKey]

          if (mdxModule) {
            return [filePath, mdxModule]
          }

          return [filePath, Promise.resolve({ default: null })]
        })
      ),
    }
  }

  const allModulesKeysByPathname = Object.fromEntries(
    Object.keys(allModules)
      .sort()
      .map((key) => {
        const pathname = filePathToUrlPathname(key, baseDirectory)
        return [pathname, key]
      })
  )

  /** Parses and attaches metadata to a module. */
  async function parseModule(pathname?: string) {
    if (pathname === undefined) {
      return null
    }

    const moduleKey = allModulesKeysByPathname[pathname]

    if (moduleKey === undefined) {
      return null
    }

    const sourceFile = sourceFiles?.find((sourceFile) => {
      return (
        filePathToUrlPathname(sourceFile.getFilePath(), baseDirectory) ===
        pathname
      )
    })
    const propTypes = sourceFile ? getExportedPropTypes(sourceFile) : null
    const examples = sourceFile
      ? getExamplesFromDirectory(sourceFile.getDirectory()).map(
          (sourceFile) => {
            const pathname = filePathToUrlPathname(
              sourceFile.getFilePath(),
              baseDirectory
            )
            const moduleKey = allModulesKeysByPathname[pathname]
            const module = allModules[moduleKey]
            const name = sourceFile.getBaseNameWithoutExtension()
            return {
              name,
              pathname,
              module,
              slug: kebabCase(name),
            }
          }
        )
      : null
    const filename = cleanFilename(
      allModulesKeysByPathname[pathname].split('/').pop()
    )
    const filenameTitle = /(readme|index)$/i.test(filename)
      ? parseTitle(
          allModulesKeysByPathname[pathname].split('/').slice(-2, -1).pop()
        )
      : isPascalCase(filename)
        ? filename
        : parseTitle(filename)
    const {
      default: Content,
      headings,
      metadata,
      ...exports
    } = await allModules[moduleKey]

    return {
      Content,
      title: metadata?.title || headings?.[0]?.text || filenameTitle,
      pathname: `/${join(basePath, pathname)}`,
      headings,
      metadata,
      types: propTypes,
      examples,
      ...exports,
    } as Module & Type
  }

  /** Returns the active and sibling data based on the active pathname. */
  async function getPathData(
    /** The pathname of the active page. */
    pathname: string | string[]
  ): Promise<
    Module & {
      previous?: Module
      next?: Module
    }
  > {
    const stringPathname = Array.isArray(pathname)
      ? pathname.join('/')
      : pathname
    const activeIndex = Object.keys(allModulesKeysByPathname).findIndex(
      (dataPathname) => dataPathname.includes(stringPathname)
    )

    function getSiblingPathname(startIndex: number, direction: number) {
      const siblingIndex = startIndex + direction
      const siblingPathname = Object.keys(allModulesKeysByPathname)[
        siblingIndex
      ]

      /** Skip readme and index files since they relate to the directory. */
      if (/(readme|index)$/i.test(siblingPathname)) {
        return undefined
      }

      if (siblingPathname === null) {
        return getSiblingPathname(siblingIndex, direction)
      }
      return siblingPathname
    }

    const [active, previous, next] = await Promise.all([
      parseModule(stringPathname),
      parseModule(getSiblingPathname(activeIndex, -1)),
      parseModule(getSiblingPathname(activeIndex, 1)),
    ])

    if (active === null) {
      return null
    }

    return Object.assign(active, { previous, next }) as Module &
      Type & {
        previous?: Module & Type
        next?: Module & Type
      }
  }

  return {
    /** Returns all modules. */
    async all() {
      /** Filter out example modules */
      const filteredKeys = Object.keys(allModulesKeysByPathname).filter(
        (pathname) => {
          const moduleKey = allModulesKeysByPathname[pathname]
          return moduleKey
            ? moduleKey.includes('examples')
              ? !/ts(x)?/.test(moduleKey)
              : true
            : true
        }
      )
      const filteredModules = await Promise.all(
        filteredKeys.map((pathname) => parseModule(pathname))
      )
      return Object.fromEntries(
        filteredKeys.map((pathname, index) => [
          pathname,
          filteredModules[index],
        ])
      )
    },

    /** Returns a module by pathname including metadata, examples, and previous/next modules. */
    async get(pathname: string | string[]) {
      const data = await getPathData(pathname)
      return data
    },

    /** Returns paths for all modules calculated from file system paths. */
    paths(): string[][] {
      return Object.keys(allModulesKeysByPathname).map((pathname) =>
        pathname
          // Split pathname into an array
          .split('/')
          // Remove empty strings
          .filter(Boolean)
      )
    },
  }
}

/** Converts a file system path to a URL-friendly pathname. */
function filePathToUrlPathname(filePath: string, baseDirectory?: string) {
  const parsedFilePath = filePath
    // Remove leading separator "./"
    .replace(/^\.\//, '')
    // Remove leading sorting number "01."
    .replace(/\/\d+\./g, '/')
    // Remove working directory
    .replace(
      baseDirectory
        ? `${resolve(process.cwd(), baseDirectory)}/`
        : process.cwd(),
      ''
    )
    // Remove base directory
    .replace(baseDirectory ? `${baseDirectory}/` : '', '')
    // Remove file extensions
    .replace(/\.[^/.]+$/, '')
    // Remove trailing "/readme" or "/index"
    .replace(/\/(readme|index)$/i, '')

  // Convert component names to kebab case for case-insensitive paths
  const segments = parsedFilePath.split('/')

  return segments
    .map((segment) => (/[A-Z]/.test(segment[0]) ? kebabCase(segment) : segment))
    .filter(Boolean)
    .join('/')
}

/** Cleans a filename for use as a slug or title. */
function cleanFilename(filename: string) {
  return (
    filename
      // Remove leading sorting number
      .replace(/^\d+\./, '')
      // Remove file extensions
      .replace(/\.[^/.]+$/, '')
  )
}

/** Determines if a string is in PascalCase. */
function isPascalCase(str: string) {
  const regex = /^[A-Z][a-zA-Z0-9]*$/
  return regex.test(str)
}

/** Determines if a symbol is private or not based on the JSDoc tag. */
function hasPrivateTag(node: Node<ts.Node>) {
  if (Node.isJSDocable(node)) {
    const jsDocTags = node.getJsDocs().flatMap((doc) => doc.getTags())
    return jsDocTags.some((tag) => tag.getTagName() === 'private')
  }
  return null
}

/** Returns the implementation of a symbol. */
function getImplementation(symbol: Symbol) {
  const aliasedSymbol = symbol.getAliasedSymbol() || symbol
  const declarations = aliasedSymbol.getDeclarations()
  return declarations.length > 0 ? declarations[0] : null
}
