# Spike Chrome extension Development

This document describes how to build a chrome extension from scratch using React and Redux.

## Table of contents

- [Prerequisites](#prerequisites)
- [High level overview](#high-level-overview)
- [Folder structure](#folder-structure)
- [Message passing](#message-passing)
- [Installation](#installation)

## Prerequisites

Before you can jump into learning developing Chrome Extensions knowledge of the following items is necessary:

- JavaScript
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)

## High level overview

A typical chrome extension exists of the following three files:

1. **Content script**: this javascript file is capable of reading, manipulating and listening to events on the DOM.
1. **Background script**: as the name implies, this javascript file runs on the background and listens to Chrome related events.
1. **Manifest**: a JSON file containing all information and configuration regarding the extension. This file is processed by the browser and contains details such as details, permissions and assets.

> **IMPORTANT:** The content script can communicate with the background script via [Message passing](#message-passing)

## Folder structure

```
.
├── build
│   └── ...
├── public
│   ├── index.html
│   ├── manifest.json
│   ├── options.html
│   └── ...
├── src
│   ├── views
│   │   ├── Options
│   │   └── Popup
│   ├── background.js
│   ├── content.js
│   ├── index.js
│   └── options.js
├── package.json
```

- `build`: ...
- `public`: contains [manifest.json](#high-level-overview) and HTML templates for every React view. E.g. index.html and options.html are the templates for the extensions' popup and options pages respectively.
- `src/views`: this folder holds all React components and corresponding assests such as css and test files.
- `src/background.js`: is the chrome extensions' [background script](#high-level-overview).
- `src/content.js`: is the chrome extensions' [content script](#high-level-overview).
- `src/*.js`: all other javascripts files are entry points for each React view.

## Message passing

## Redux

Unfortunenately Redux (Toolkit) does not work out of the box within a chrome extension. Fortunenately there is a package that will make this work with little effort: [Reduxed Chrome Storage](https://www.npmjs.com/package/reduxed-chrome-storage), which uses [chrome.storage API](https://developer.chrome.com/docs/extensions/reference/storage/). The only downside of using this package is that it does not support the [configureStore](https://redux-toolkit.js.org/api/configureStore) function from Redux Toolkit. Instead we can use [`createStore`](https://redux.js.org/api/createstore) and [`combineReducers`](https://redux.js.org/api/combinereducers) to setup a store.

The [chrome.storage API](https://developer.chrome.com/docs/extensions/reference/storage/) is asynchronous. Therefore the store which is created by [Reduxed Chrome Storages](https://www.npmjs.com/package/reduxed-chrome-storage) function `storeCreatorFactory` needs to be imported asynschoniously. E.g.:

**store.js**

```js
import { createStore, combineReducers } from 'redux'
import storeCreatorFactory from 'reduxed-chrome-storage'
import { exampleReducer } from './services/exampleSlice'

const reducer = combineReducers({
  example: exampleReducer,
})

const setupStore = async () => await storeCreatorFactory({ createStore })(reducer)

export { setupStore }
```

**App.js**

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { Component } from './Component'
import { Provider } from 'react-redux'
import { setupStore } from './services/store'

// TODO: dit kan netter! Zie services/store.js!
;(async () => {
  const store = await setupStore()

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Component />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
})()
```

## Installation

To install a chrome extension which isn't published in the Chrome Web Store you need to following steps:

1. Go to [chrome://extensions](chrome://extensions)
2. Switch on `Developer mode` in the top right corner, this enables the ability to locally install chrome extensions.
3. Click on `Load unpacked` and select the `build` folder of the chrome extension.
4. C'est ca! The extension should be installed.
