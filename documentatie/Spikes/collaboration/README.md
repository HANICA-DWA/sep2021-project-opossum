# Spike: Near real-time collaboration

This project is in need of a collaborative

# CRDT vs OT

Developing near real-time collaborative applications require reliable data structures and algorithms to share this data structure to ensure consistency among all participating clients. There are two leading algorithms behind near real-time collaborative: the most recent is [CDRT](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) (_Conflict-free replicated data types_) and the older and more tranditional [OT](https://en.wikipedia.org/wiki/Operational_transformation) (_Operational Transformation_). Both have their advantages and disadvantages.

#### Differences

I could write down a whole essay about the differences between the two algorithms. Fortunately, however someone already gave a clear answer to this question on [stackoverflow](https://stackoverflow.com/a/27494397).

#### Advantages & Disadvantages

There are many pros and cons behind these algorithms. However after a little bit of researching I found out that the implementation of CDRT and OT are more important as every framework does this differently, therefore the advantages and disadvantages will differ per framework even if they use the same technology.

Now that the technology behind collaborative applications is clear we can now further elaborate on which implementation, read framekwork, fits in this project.

# Existing frameworks

There are a few exisiting frameworks that the general internet and our teacher recommended.

| Framework                                           | :star: | Issues | Technology | Remarks                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------- | ------ | ------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Automerge](https://github.com/automerge/automerge) | 11.4k  | 56     | CRDT       | JSON document, offline editing, p2p support (WebRTC), WebSocket support, auto distributed. Little [documentation](https://github.com/automerge/automerge) with a few examples.                                                                                                                                |
| [yjs](https://github.com/yjs/yjs)                   | 5.6k   | 24     | CRDT       | same as Automerge, scalable with unlimited users, integration with 8 different [RTE](https://docs.yjs.dev/ecosystem/editor-bindings)s, rich [documentation](https://docs.yjs.dev/), many [examples](https://github.com/yjs/yjs#example-observe-types) and many more [demos](https://github.com/yjs/yjs-demos) |
| [ShareDB](https://github.com/share/sharedb)         | 4.7k   | 24     | OT         | Uses a db as single source of truth (MongoDB, Postgres and [more](https://share.github.io/sharedb/adapters/database)), JSON document, middlware, reasonable [documentation](https://share.github.io/sharedb/), horizontally scalable, offline editing, access to previous versions                            |

# Comparison

Instead of researching (making prototypes (very time consuming) and comparing the pros and cons) every framework and comparing the results I decided to do literature research in order to find out which of these frameworks will be used in this project.

#### Automerge vs Yjs

Automerge was primarily build for sharing application state. The developers of automerge decided to make application state immutable, and therefore it nicely integrates into React/Redux applications.

Yjs was primarily build for **shared editing on text** and **rich-text**. Yjs exposes state as mutable data types. State is mutable by design, because some computations can be done more efficiently on _mutable_ objects.

Yjs is the better choice if you plan to share text documents, because

1. It's algorithm is specifically designed for shared editing.
1. It encodes it's structure very efficiently in a binary format. Automerge on the other hand might be easier to handle because state changes are just operations on the shared document.

In a word, If you are _not_ working on a _shared editing application_ and you are not hitting any performance problems, then you are probably fine with automerge. Otherwise Yjs would be a better choice

#### ShareDB vs Yjs

Yjs is much easier to use, has offline support, and works peer-to-peer. However for the average developer there is in fact very little differenc, despite from the fact that Yjs is _easier_ to set-up.

Yjs and ShareDB are conceptually different. ShareDB is rather hard to use because users of this library, have to know about how the data is structured and has to apply transformations on the data. Yjs provides types that are _observable_, convenient to use, and have _bindings to several [rich text editors](https://docs.yjs.dev/ecosystem/editor-bindings)_.

There are a lot of things that you can do in Yjs, but you can't do in ShareDB. For example, you can design a completely distributed application with Yjs (see y-webrtc or y-ipfs). It is also possible to scale Yjs to serve millions of users. As a comparison, you can open a google docs document with at most 50 users. While ShareDB generally supports more users than that, it is hard to scale ShareDB, because there is only a **single source of truth** - **a single source of failure**. This is a limitation of the transformation approach that is used in ShareDB (OT).

#### Conclusion

In the use case of this project, which needs shared editing on text, **Yjs** is the perfect solution as it was primarly built for this use case. It also is the developer friendliest framework as it has out of the box features that is needed in this project.

> **sources:**
>
> 1. https://github.com/yjs/yjs/issues/93
> 2. https://github.com/dmonad/crdt-benchmarks
> 3. https://github.com/yjs/yjs/issues/145

# Prototyping
