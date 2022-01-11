# WCAG Tool Chrome extension

Description...

## Prerequisites

Before you can jump into learning developing Chrome Extensions knowledge of the following items is necessary:

- JavaScript
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/) / [Redux Toolkit](https://redux-toolkit.js.org/)

## High level overview

A typical chrome extension exists of the following three files:

1. **Content script**: this jsx file is capable of reading, manipulating and listening to events on the DOM. It is also possible to use React related code in this script.
1. **Background script**: as the name implies, this javascript file runs on the background and listens to Chrome related events.
1. **Manifest**: a JSON file containing all information and configuration regarding the extension. This file is processed by the browser and contains details such as details, permissions and assets.

> **IMPORTANT:** The content script can communicate with the background script via [Message passing](#message-passing)

## Project structure

```
.
├── dist
│   └── ...
├── public
│   ├── manifest.json
│   ├── options.html
│   └── popup.html
├── src
│   ├── hooks
│   │   └── ...
│   ├── services
│   │   └── ...
│   ├── views
│   │   ├── Options
│   │   └── Popup
│   ├── background.js
│   ├── content.jsx
│   ├── *.js
│   └── store.js
└── package.json
```

## Install

`npm install`

## Development

Use the following command to enable hot reloading  
`npm run dev`

## Single-file
Building single-file. Use dev command to build with watch.

`npm run dev:single-file`
`npm run build:single-file`

## Remotedev

`npm run remotedev`

## Lint

`npm run lint`

## Lint Fix

`npm run lint:fix`

## Test

`npm run test:unit`
`npm run test:e2e`

## Clean

`npm run clean`

## Build

`npm run build`

## Installation

To install a chrome extension which isn't published in the Chrome Web Store you need to following steps:

1. Go to [chrome://extensions](chrome://extensions)
2. Switch on `Developer mode` in the top right corner, this enables the ability to locally install chrome extensions.
3. Click on `Load unpacked` and select the `build` folder of the chrome extension.
4. C'est ca! The extension should be installed.

## Setup Redux devtools
Because we use reduxified chrome storage, the in browser redux devtools aren't able to connect to the redux store. To resolve this you'll have to install the remote redux devtools.
To setup redux devtools do the following:
1. Install : `npm install --save-dev remotedev-server`
2. Add the following lines to `Package.json`
 ```
 "scripts": {
 ...
  "remotedev": "remotedev --hostname=localhost --port=8000"
}
```
3. Install `npm install --save-dev remote-redux-devtools`
4. In redux store setup change the following lines:
```javascript
+ import { composeWithDevTools } from 'remote-redux-devtools'

- storeCreatorFactory({createStore})(reducers)
+ storeCreatorFactory({createStore})(reducers, composeWithDevTools({realtime: true, port: 8000})())
```
5. run `npm run remotedev` and open redux remote devtools (together with `npm run dev` in a different terminal when developping)
6. open redux remote devtools by right clicking on a webpage, 'Redux DevTools' -> 'Open Remote DevTools'
7. Go to settings and check 'use custom (local) server'. Default settings should be correct (localhost:8000).
8. Uncheck use secure connection.
