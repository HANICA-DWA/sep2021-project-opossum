import React from 'react'
import ReactDOM from 'react-dom'
import '../index.css'
import './editor.css'
import './editor.js'

const Editor = () => {
  const editorElement = document.querySelector('.editor')

  return (
    <div className={"toolbar"}>
      <button onClick={(e)=> {
        console.log("clicked")
        editorElement.contentWindow.postMessage(JSON.stringify({method: 'elementSelect'}), '*')
        editorElement.contentWindow.focus()
      }}>Test</button>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>,
  document.getElementById('root'),
)
