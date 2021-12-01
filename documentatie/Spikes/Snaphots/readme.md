# Snapshot Spike

In this document we research the best way to save a page. We need this so we can annotate dynamic every-changing websites.

## MHTML

The browser API for extension (Chrome and Firefox) has the ability to save pages in mhtml.

We haven't chosen for this due to the fact that iframes have difficulty displaying MHTML files. It also doesn't work with JavaScript and images and other media aren't stored.

In tests the page didn't come out the same as the original webpage.

## single-file html

When researching this problem we have searched for existing plugins that try to save a web page. We've found multiple but settled with single-file because of the following.

* Custom options when saving (with or without JavaScript, compression, etc.)
* Great support
  * The GitHub repository of single-file has:
    * Wiki pages for integrating single-file API in extensions
    * Active developer that responds to user created issues and emails
    * Users can create issues
* Elaborate extension with page editor.

As the name suggests single-file plugin can save a page into a single html file. It encodes and inlines images, CSS, iframes, fonts and JavaScript. So you have everything in a single file without needing to do web requests.

The exception is video and audio files. It has the option to remove the link to those sources or leave them in.



#### Useful Links

* [Single-file repository manifest v2](https://github.com/gildas-lormeau/SingleFile)
* [Integrate Single-file API into extension](https://github.com/gildas-lormeau/SingleFile/wiki/How-to-integrate-the-API-of-SingleFile-into-an-extension)
* [Single-file repository manifest v3](https://github.com/gildas-lormeau/SingleFile-Lite)



## Prototype

The prototypes uses single-file to save a page and open the saved page in an editor.

Using the button in the popup menu or context menu the snapshot creation process can be started.

#### Good to know

- `npm run single-file`  to repack the single-file extension in the bundled JavaScript
- In the file rollup.config.js you can see what JavaScript files are bundles to what files.
- Most of the communication between the extensions background script, content script and popup is done by message passing. This is the recommended way. More info: [Message passing manifest v3](https://developer.chrome.com/docs/extensions/mv3/messaging/)
- The prototype still has allot of code remains from the single-file extension that isn't used.