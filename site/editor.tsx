import * as React from 'react'
import { Editor as ClientEditor } from 'mdxts/components/client'
import type { EditorProps } from 'mdxts/components/client'
import { Code } from 'mdxts/components'

/** Renders a code editor with syntax highlighting, type information, and autocomplete. */
export function Editor({
  defaultValue,
  language,
  filename,
  lineNumbers,
  theme,
}: Omit<EditorProps, 'onChange' | 'value'>) {
  return (
    <ClientEditor
      defaultValue={defaultValue}
      filename={filename}
      language={language}
      lineNumbers={lineNumbers}
      theme={theme}
    >
      <Code
        value={defaultValue}
        filename={filename}
        language={language}
        lineNumbers={lineNumbers}
        theme={theme}
      />
    </ClientEditor>
  )
}
