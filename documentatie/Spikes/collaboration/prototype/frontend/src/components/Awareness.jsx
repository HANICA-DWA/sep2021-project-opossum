import { useState, useEffect } from 'react'

const Awareness = ({ provider, clientId, ...props }) => {
  const [name, setName] = useState(clientId)
  const [color, setColor] = useState('blue')
  const [clients, setClients] = useState([])

  useEffect(() => {
    console.log('Awareness useEffect!')

    if (provider) {
      // Listen to awareness changes
      provider.awareness.on('change', () => {
        const _clients = []
        provider.awareness.getStates().forEach((state) => {
          if (state.user) _clients.push({ ...state.user })
        })
        setClients(_clients)
      })

      // Set awareness information
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
    <div>
      <h2>Awareness</h2>

      <ul>
        {clients.map((client) => (
          <li key={client.name} style={{ color: client.color }}>
            {client.name}
          </li>
        ))}
      </ul>
      <input onChange={(event) => setName(event.target.value)} value={name} placeholder="name" />
      <input onChange={(event) => setColor(event.target.value)} value={color} placeholder="css color" />
    </div>
  )
}

export { Awareness }
