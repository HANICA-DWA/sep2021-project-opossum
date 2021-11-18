import {
  BoldExtension,
  ItalicExtension,
  YjsExtension,
  PlaceholderExtension,
  AnnotationExtension,
} from 'remirror/extensions'
import { Remirror, EditorComponent, useRemirror, useCommands } from '@remirror/react'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import 'remirror/styles/all.css'
import { useEffect } from 'react'

const ydoc = new Y.Doc()

const Menu = () => {
  const { toggleBold, toggleItalic, focus } = useCommands()

  return (
    <>
      <button
        onClick={() => {
          toggleBold()
          focus()
        }}
      >
        B
      </button>
      <button
        onClick={() => {
          toggleItalic()
          focus()
        }}
      >
        I
      </button>
    </>
  )
}

const Editor = () => {
  useEffect(() => {}, [])

  const { manager, state } = useRemirror({
    extensions: [
      new BoldExtension(),
      new ItalicExtension(),
      new PlaceholderExtension({ placeholder: 'Description...' }),
      new AnnotationExtension(),
      new YjsExtension({ getProvider: () => new WebsocketProvider('wss://demos.yjs.dev', 'test99', ydoc) }),
    ],
    selection: 'start',
    stringHandler: 'text', // Kan Markdown zijn! Voeg MarkdownExtension toe!
  })

  return (
    <div className="remirror-theme">
      <Remirror manager={manager} initialContent={state}>
        <EditorComponent />
        <Menu />
      </Remirror>
    </div>
  )
}

export { Editor }
