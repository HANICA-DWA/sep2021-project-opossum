import React from 'react'
import { useState, useEffect } from 'react'

export function FirstLetterAndCapitalize(str = '') {
  // console.log('str value: ' + str)

  // const str2 = str.toString()

  if (str?.length > 0) return str.charAt(0).toUpperCase()

  return ''
}

const Awareness = ({ provider, clientId, ...props }) => {
  const [name, setName] = useState('')
  const [color, setColor] = useState('white')
  const [clients, setClients] = useState([])

  //Setting dummy names and colours for users
  useEffect(() => {
    const colours = ["red", "yellow", "green", "violet", "orange", "pink", "white", "lime"];
    // const colours = ["orange"];
    const random = Math.floor(Math.random() * colours.length);
    console.log('Colour: ' + colours[random])
    setColor(colours[random])
    
    const names = ["Bob", "James", "Jessie", "Rob", "Harry", "Henk", "Jan", "Alfred", "Xenos", "Siegmeyer", "Ifrit", "Peter", "May", "Yvonne", "Frank"];
    const random2 = Math.floor(Math.random() * names.length);
    console.log('Name: ' + names[random2])
    setName(names[random2])
  }, [])

  useEffect(() => {
    console.log('A: Awareness useEffect!')

    if (provider) {
      console.log('B: Listening to awareness changes!')
      // Listen to awareness changes
      provider.awareness.on('change', () => {
        console.log('C: Awareness changes!')
        const _clients = []
        provider.awareness.getStates().forEach((state) => {
          if (state.user) _clients.push({ ...state.user })
        })
        setClients(_clients)
      })

      // Set awareness information
      console.log('D: Set awareness information!')
      provider.awareness.setLocalStateField('user', {
        name: name,
        color: color,
      })
    }

    // Cleanup after unmounting component
    return () => {
      provider.awareness.off('change')
    }
  }, [name, color, provider])

  return (
    <div className="flex flex-col items-center bg-gray-200 p-4 font-poppins">
      <h2>Awareness, these are the users that are currently using the extension!</h2>

      {clients.map((client) => (
        <div key={client.clientId} className="flex justify-center items-center rounded-full h-6 w-6" style={{ backgroundColor: client.color }} >
          <p title={client.name} className="h-4 text-center font-poppins-semi">
            {FirstLetterAndCapitalize(client.name)}
          </p>
        </div>
      ))}

      {/* <ul>
        {clients.map((client) => (
          <li key={clientId} style={{ color: client.color }}>
            {'User: ' + client.name + ' - ' + clientId}
          </li>
        ))}
      </ul> */}
      {/* <input onChange={(event) => setName(event.target.value)} value={name} placeholder="name" />
      <input onChange={(event) => setColor(event.target.value)} value={color} placeholder="css color" /> */}
    </div>
  )
}

export default Awareness
