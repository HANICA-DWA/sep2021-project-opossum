import React from 'react'
import { useState, useEffect } from 'react'
import { useSliders } from '../../hooks'

export function FirstLetterAndCapitalize(str = '') {
  if (str?.length > 0) return str.charAt(0).toUpperCase()

  return ''
}

const Awareness = ({ provider, clientId }) => {
  const [{}, {anySliderOpen}] = useSliders()
  const position = anySliderOpen ? 'transform-to-right' : 'transform-to-left'

  const [clients, setClients] = useState([])

  useEffect(() => {

    if (provider) {
      // Listen to awareness changes
      provider.awareness.on('change', () => {
        const _clients = []
        provider.awareness.getStates().forEach((state) => { 
          if (state.user) {
            _clients.push({ ...state.user })
          }
        })
        // _clients.reverse()
        setClients(_clients)
      })

      const names = ["Bob", "James", "Jessie", "Rob", "Harry", "Henk", "Jan", "Alfred", "Xenos", "Siegmeyer", "Ifrit", "Peter", "May", "Yvonne", "Frank", "Gerda", "Jolanda"];
      const colours = ["red", "yellow", "green", "violet", "orange", "pink", "gray", "lime"];

      // Set awareness information
      provider.awareness.setLocalStateField('user', {
        id: clientId,
        name: names[Math.floor(Math.random() * names.length)], // TODO: Change for real values
        color: colours[Math.floor(Math.random() * colours.length)], // TODO: Change for real values
      })
    }

    // Cleanup after unmounting component
    return () => {
      provider.awareness.off('change')
    }
  }, [provider])

  return (
    <div className={`flex flex-col absolute top-12 p-4 pr-8 pb-8 font-poppins ${position}`}>
      {clients.map((client) => (
        <div key={client.id} className="flex justify-center items-center rounded-full my-1 h-8 w-8 hover:text-opacity-50 hover:bg-opacity-50" style={{ backgroundColor: client.color }} >
          <p title={client.name} className="text-center text-sm font-poppins-semi cursor-default">
            {FirstLetterAndCapitalize(client.name)}
          </p>
        </div>
      ))}
    </div>

    // <div className="flex absolute top-4 right-4 font-poppins">
    // {clients.map((client) => (
    //   <div key={client.id} className="flex justify-center items-center rounded-full m-1 h-8 w-8" style={{ backgroundColor: client.color }} >
    //     <p title={client.name} className="text-center text-sm font-poppins-semi">
    //       {FirstLetterAndCapitalize(client.name)}
    //     </p>
    //   </div>
    // ))}
    // </div>
  )
}

export default Awareness
