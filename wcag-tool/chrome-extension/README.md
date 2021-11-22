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

## Lint & Fix

`npm run lint`

## Test

`npm run test`

## Clean

`npm run clean`

## Build

`npm run build`

## Remotedev
`npm run remotedev`

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
5. Install 'Redux DevTools' chrome extension 

6. run `npm run remotedev`
7. run `npm run dev`
8. Open dev tools by right clicking on the extension body content and selecting  Redux DevTools
9. You can inspect the extension html by also clicking the extension body content and selecting 'Inspect'