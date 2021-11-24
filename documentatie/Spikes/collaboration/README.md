# Spike: Near real-time collaboration

This project is in need of a collaborative snapshot and corresponding annotations editor. This research will result in usable code to edit arrays and text fields collaboratively.

## Requirements:

- Should work with _React_
- Should be able to display list of all collaborators
- Should be able to collaboratively edit arrays 
- Should be able to collaboratively edit multiple text fields.
- Should be usable (performance wise)

## Table of contents

- [CRDT vs OT](#CRDT-vs-OT)
  - [Differences](#Differences)
  - [Advantages and Disadvantages](#Advantages-and-Disadvantages)
- [Existing frameworks](#Existing-frameworks)
  - [Comparison](#comparison)
    - [Automerge vs Yjs](#automerge-vs-yjs)
    - [ShareDB vs Yjs](#sharedb-vs-yjs)
    - [Conclusion](#conclusion)
- [Prototype](#Prototype)
  - [Setting up Yjs](#Setting-up-yjs)
    - [Overview](#Overview)
    - [Frontend](#Frontend)
    - [Backend](#Backend)
  - [Collaborative text](#Collaborative-text)
  - [Collaborative array](#Collaborative-array)
  - [Awareness](#awareness)

# CRDT vs OT

Developing near real-time collaborative applications require reliable data structures and algorithms to share this data structure to ensure consistency among all participating clients. There are two leading algorithms behind near real-time collaborative: the most recent is [CDRT](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) (_Conflict-free replicated data types_) and the older and more tranditional [OT](https://en.wikipedia.org/wiki/Operational_transformation) (_Operational Transformation_). Both have their advantages and disadvantages.

## Differences

I could write down a whole essay about the differences between the two algorithms. Fortunately, however someone already gave a clear answer to this question on [stackoverflow](https://stackoverflow.com/a/27494397).

## Advantages & Disadvantages

There are many pros and cons behind these algorithms. However after a little bit of researching I found out that the implementation of CDRT and OT are more important as every framework does this differently, therefore the advantages and disadvantages will differ per framework even if they use the same technology.

Now that the technology behind collaborative applications is clear we can now further elaborate on which implementation, read framekwork, fits in this project.

# Existing frameworks

There are a few exisiting frameworks that the general internet and our teacher recommended.

| Framework                                           | :star: | Issues | Technology | Remarks                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------- | ------ | ------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Automerge](https://github.com/automerge/automerge) | 11.4k  | 56     | CRDT       | JSON document, offline editing, p2p support (WebRTC), WebSocket support, auto distributed. Little [documentation](https://github.com/automerge/automerge) with a few examples.                                                                                                                                |
| [yjs](https://github.com/yjs/yjs)                   | 5.6k   | 24     | CRDT       | same as Automerge, scalable with unlimited users, integration with 8 different [RTE](https://docs.yjs.dev/ecosystem/editor-bindings)s, rich [documentation](https://docs.yjs.dev/), many [examples](https://github.com/yjs/yjs#example-observe-types) and many more [demos](https://github.com/yjs/yjs-demos) |
| [ShareDB](https://github.com/share/sharedb)         | 4.7k   | 24     | OT         | Uses a db as single source of truth (MongoDB, Postgres and [more](https://share.github.io/sharedb/adapters/database)), JSON document, middlware, reasonable [documentation](https://share.github.io/sharedb/), horizontally scalable, offline editing, access to previous versions                            |

## Comparison

Instead of researching (making prototypes (very time consuming) and comparing the pros and cons) every framework and comparing the results I decided to do literature research in order to find out which of these frameworks will be used in this project.

### Automerge vs Yjs

Automerge was primarily build for sharing application state. The developers of automerge decided to make application state immutable, and therefore it nicely integrates into React/Redux applications.

Yjs was primarily build for **shared editing on text** and **rich-text**. Yjs exposes state as mutable data types. State is mutable by design, because some computations can be done more efficiently on _mutable_ objects.

Yjs is the better choice if you plan to share text documents, because

1. It's algorithm is specifically designed for shared editing.
1. It encodes it's structure very efficiently in a binary format. Automerge on the other hand might be easier to handle because state changes are just operations on the shared document.

In a word, If you are _not_ working on a _shared editing application_ and you are not hitting any performance problems, then you are probably fine with automerge. Otherwise Yjs would be a better choice

### ShareDB vs Yjs

Yjs is much easier to use, has offline support, and works peer-to-peer. However for the average developer there is in fact very little differenc, despite from the fact that Yjs is _easier_ to set-up.

Yjs and ShareDB are conceptually different. ShareDB is rather hard to use because users of this library, have to know about how the data is structured and has to apply transformations on the data. Yjs provides types that are _observable_, convenient to use, and have _bindings to several [rich text editors](https://docs.yjs.dev/ecosystem/editor-bindings)_.

There are a lot of things that you can do in Yjs, but you can't do in ShareDB. For example, you can design a completely distributed application with Yjs (see y-webrtc or y-ipfs). It is also possible to scale Yjs to serve millions of users. As a comparison, you can open a google docs document with at most 50 users. While ShareDB generally supports more users than that, it is hard to scale ShareDB, because there is only a **single source of truth** - **a single source of failure**. This is a limitation of the transformation approach that is used in ShareDB (OT).

### Conclusion

In the use case of this project, which needs shared editing on text, **Yjs** is the perfect solution as it was primarly built for this use case. It also is the developer friendliest framework as it has out of the box features that is needed in this project.

# Prototyping

The purpose of this Spike is to find out how to use collaborative arrays, which holds all annotations, and text, the annotations, data types. We can divide this problem in two: collaborative arrays and collaborative text. The latter was the easiest to implement, because there are already packages to connect an exisiting text editor to Yjs. The only challenge was to find an editor that is compatible with _React_. The first was harder as there is no existing "array editing" framework that works with Yjs.

The big problem when developing this prototype was that there was little documentation and even littler examples on how to use this all in React. You will notice differences in the examples and documentation. That is because the documentation is not complete. I found out about several Yjs API's on the internet searching through the Yjs forums, GitHub issues and stackoverflow.

## Setting up Yjs

This chapter will explain how to implement Yjs with React. I recommend reading through the Yjs [documentation on Y.Doc](https://github.com/yjs/yjs#YDoc), which is the shared document that holds all collaborative datatypes such as arrays and text. Also read the [y-websocket documentation](https://github.com/yjs/y-websocket), which shares the shared document via websocket connections. There are also other [providers](https://github.com/yjs/yjs#Providers) like WebRTC. However we might want to add persistence (works best with websocket provider). The other argument to choose websockets over WebRTC is that the developers learned about websockets in class and nothing about WebRTC.

### Overview

- **ydoc**: An object, read document, that holds all shared datatypes such as arrays and text objects.
  - You can declare/get these datatypes by calling `getText(<fieldname>)`and `getArray(<arrayname>)`
- **provider**: An object which holds and manages the websocket connection. It also contains an awareness object
- **awareness**: Object that contains cursor positions and user information of each client. This can be a seperate object but we use the default on which can be found in the provider object.

### Frontend

In order to share a document we need to setup an ydoc and websocket provider. You can pass several [options](https://github.com/yjs/y-websocket#api) to the constructor of \*WebsocketProvider, such as websocket polyfill and a seperate awareness object.

> > **App.js**

```js
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

const yDoc = new Y.Doc()
const provider = new WebsocketProvider('ws://localhost:5000', 'snapshotId', yDoc)

const App = () => {

  ...

  useEffect(() => {
    return () => {
      // Cleanup before unmounting
      provider.destroy()
      yDoc.destroy()
    }
  }, [])

  ...

}
```

### Backend

The backend setup with _express_, _http_, _ws_ and _cors_ is exactly the same as we learned in class. However we need to call a function _setupWSConnection_ from the _y-websocket_ module.

> > **server.js**

```js
const { setupWSConnection } = require('y-websocket/bin/utils')

...

wsServer.on('connection', (ws, req) => {
  setupWSConnection(ws, req)

console.log('[WS] New connection!')

  ws.on('open', () => console.log('[WS] Connection opened!'))

  ws.on('close', (code, reason) => console.log('[WS] Connection closed:', code, reason))

  ws.on('error', (err) => console.log('[WS] Connection error:', err))
})

httpServer.on('upgrade', (req, socket, head) => {
  // You may check auth of request here..

  wsServer.handleUpgrade(req, socket, head, (ws, _req) => {
    wsServer.emit('connection', ws, req)
  })
})

...
```

## Collaborative Text

### Step 1: Setup _Quill_ and _react-quill_.

> > **Editor.jsx**

```js
...
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Editor = ({ydoc, provider}) => {
  // States
  const [text, setText] = useState('')

  // Refs
  const quillRef = useRef(undefined)
  const reactQuillRef = useRef(undefined)

  const attachRefs = () => {
    if (typeof reactQuillTitleRef.current.getEditor !== 'function') return
    quillRef.current = reactQuill.current.getEditor()
  }

  // Quill modules
  const modules = {
    toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic']],
    history: {
      userOnly: true,
  },

  useEffect(() => {

    attachRefs()

    // Cleanup before unmounting
    return () => {
      quillRef.current = undefined,
      reactQuillRef.current = undefined
    }
  }, [])

  return (
    <ReactQuill
      modules={modules}
      value={text}
      onChange={setText}
      ref={reactQuillRef}
      placeholder="Start collaborating..."
      theme="snow"
    />
  )

}
```

### Step 2: Add Yjs binding and logic

We need to add the following:

- QuillCursors module to enable visibility of all cursors
- QuillBinding from Yjs

> > **Editor.jsx**

```js
+ import QuillCursors from 'quill-cursors'
+ import { QuillBinding } from 'y-quill'

//  Register Quill modules
+ Quill.register('modules/cursors', QuillCursors, false)
...

const Editor = ({ydoc, provider}) => {
  ...


  // Quill modules
  const modules = {
+   cursors: true,
    ...
  }

  useEffect(() => {
    ...
+   const yText = ydoc.getText('text')
+   const quillBinding = new QuillBinding(yText, quillRef.current, provider.awareness)

+   if (provider.synced) {
      // Logic to initialize the text fields, use setText(). It will automatically sync with the ydoc because of the QuillBinding
+   } else {
+     provider.once('synced', () => {
        // Read above comment...
+     })
+   }

    // Cleanup before unmounting
    return () => {
+     quillBinding.destroy()
      ...
    }
+ }, [ydoc, provider])

}

```

## Collaborative Array

In order to use the collaborative array we need to use the observer pattern to track changes and update the React state to represent these changes. Opposite to the collaborative text type, we should not use the setter function of a React state to initialize the data. We use the ydoc object for these and react will update automatically because of the observer. Please read the [documentation on yarrays](https://github.com/yjs/yjs#shared-types) before reading the example.

> > **List.jsx**

```js
const List = ({ ydoc, provider }) => {
  const [items, setItems] = useState([])
  const yarrayRef = useRef(ydoc.getArray(`items`))

  const loadItems = async () => {
    const { data } = await axios.get(`/api/items`)

    // Calculate difference between Yjs and fetched state
    const difference = [...yArrayRef.current.toArray(), ...data].filter(
      (val) => !yArrayRef.current.toArray().some((_val) => _val._id === val._id)
    )

    // Update Yjs state
    if (difference.length > 0) yArrayRef.current.insert(0, difference)

    // Update React state
    setItems(yArrayRef.current.toArray())
  }

  useEffect(() => {
    // Initialize Yjs and React state
    if (provider.synced) {
      loadItems()
    } else {
      provider.once('synced', loadItems)
    }

    // Add observer to sync react with Yjs state
    yArrayRef.current.observe((event, transaction) => {
      console.log('array changed!')
      setItems(yArrayRef.current.toArray())
    })

    // Cleanup before unmounting
    return () => {
      yArrayRef.current.unobserve((event, transaction) => {
        console.log('array unobserved!')
      })
    }
  }, [ydoc, provider])

  return (
    <div>
      {items.map((item, index) => (
        <li key={item._id + index}>
          {item._id} | {item.title} | {item.description}{' '}
        </li>
      ))}
      }
    </div>
  )
}
```

## Awareness

In order to show awareness we use the object inside awareness objecti inside provider.

```js
const Awareness = ({ provider, clientId, ...props }) => {
  const [name, setName] = useState(clientId)
  const [color, setColor] = useState('blue')
  const [clients, setClients] = useState([])

  useEffect(() => {
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
```

## **sources:**

> 1. https://github.com/yjs/yjs/issues/93
> 2. https://github.com/dmonad/crdt-benchmarks
> 3. https://github.com/yjs/yjs/issues/145
