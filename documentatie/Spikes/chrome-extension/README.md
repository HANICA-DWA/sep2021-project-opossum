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

```

## Message passing

## Installation

To install a chrome extension which isn't published in the Chrome Web Store you need to following steps:

1. Go to [chrome://extensions](chrome://extensions)
2. Switch on `Developer mode`, this enables the ability to locally install an chrome extension
3. Click on `LOAD UNPACKED` and select the `build` folder of the chrome extension.
4. C'est ca! The extension should be installed.
