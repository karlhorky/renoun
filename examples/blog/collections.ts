import { createCollection, type MDXContent } from 'mdxts/collections'
import { z } from 'zod'

const frontmatterSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  summary: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

export const PostsCollection = createCollection<{
  default: MDXContent
  frontmatter: z.infer<typeof frontmatterSchema>
}>('posts/*.mdx', {
  baseDirectory: 'posts',
  schema: {
    frontmatter: frontmatterSchema.parse,
  },
  sort: async (a, b) => {
    if (a.isDirectory() || b.isDirectory()) {
      return 0
    }

    const aDate = await a
      .getNamedExport('frontmatter')
      .getValue()
      .then((frontMatter) => new Date(frontMatter.date))
    const bDate = await b
      .getNamedExport('frontmatter')
      .getValue()
      .then((frontMatter) => new Date(frontMatter.date))

    return bDate.getTime() - aDate.getTime()
  },
})
