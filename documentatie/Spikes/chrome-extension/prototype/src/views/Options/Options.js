import React, { useState } from 'react'
import { useSettings } from '../../hooks'
import './options.css'

function Options() {
  const [{ setBorderColor, setBorderWidth, setEnableBorders }, { borderColor, borderWidth, enableBorders }] =
    useSettings()
  const [color, setColor] = useState(borderColor)

  return (
    <div className="App">
      <header className="App-header">
        <p>border width: {borderWidth}</p>
        <button onClick={() => setBorderWidth(borderWidth - 1)}>decrease</button>
        <button onClick={() => setBorderWidth(borderWidth + 1)}>increase</button>

        <hr />

        <p>border color: {borderColor}</p>
        <input type="text" onChange={(event) => setColor(event.target.value)} value={color} />
        <button onClick={() => setBorderColor(color)}>set color</button>

        <hr />

        <p>borders enabled: {enableBorders.toString()}</p>
        <button onClick={() => setEnableBorders(!enableBorders)}>toggle</button>
      </header>
    </div>
  )
}

export { Options }
