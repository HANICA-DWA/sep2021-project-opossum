/* global browser, document, prompt, matchMedia, addEventListener, webkitRequestFileSystem, TEMPORARY, Blob */

const editorElement = document.querySelector(".editor");
let tabData, tabDataContents = [];
const FS_SIZE = 100 * 1024 * 1024;

addEventListener("message", event => {
  const message = JSON.parse(event.data);
  if (message.method == "onUpdate") {
    tabData.docSaved = message.saved;
  }
  if (message.method == "onInit") {
    tabData.options.disableFormatPage = !message.formatPageEnabled;
    // formatPageButton.hidden = !message.formatPageEnabled;
    document.title = "[WCAG] " + message.title;
    if (message.filename) {
      tabData.filename = message.filename;
    }
    if (message.icon) {
      const linkElement = document.createElement("link");
      linkElement.rel = "icon";
      linkElement.href = message.icon;
      document.head.appendChild(linkElement);
    }
    tabData.docSaved = true;
  }
});

addEventListener("load", () => {
  browser.runtime.sendMessage({ method: "editor.getTabData" });
});

addEventListener("beforeunload", event => {
  if (tabData.options.warnUnsavedPage && !tabData.docSaved) {
    event.preventDefault();
    event.returnValue = "";
  }
});

browser.runtime.onMessage.addListener(message => {
  if (message.method === "editor.setTabData") {
    if (message.content) {
      if (message.truncated) {
        tabDataContents.push(message.content);
      } else {
        tabDataContents = [message.content];
      }
      if (!message.truncated || message.finished) {
        tabData = JSON.parse(tabDataContents.join(""));
        tabData.tabId = message.tabId;
        tabData.options = message.options;
        tabDataContents = [];
        editorElement.contentWindow.postMessage(JSON.stringify({ method: "init", content: tabData.content }), "*");
        editorElement.contentWindow.focus();
        saveTabData();
      }
    } else {
      tabData = { tabId: message.tabId };
      loadTabData().then(() => {
        editorElement.contentWindow.postMessage(JSON.stringify({ method: "init", content: tabData.content }), "*");
        editorElement.contentWindow.focus();
      });
    }
    return Promise.resolve({});
  }
  return {};
});

function loadTabData() {
  return new Promise((resolve, reject) => {
    webkitRequestFileSystem(TEMPORARY, FS_SIZE, fs => {
      fs.root.getFile(tabData.tabId, {}, function(fileEntry) {
        fileEntry.file(data => {
          data.text()
            .then(jsonData => {
              tabData = JSON.parse(jsonData);
              resolve();
            })
            .catch(reject);
        }, reject);
      }, reject);
    }, reject);
  });
}

function saveTabData() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(tabData);
    webkitRequestFileSystem(TEMPORARY, FS_SIZE, fs => {
      fs.root.getFile(tabData.tabId, { create: true }, function(fileEntry) {
        fileEntry.createWriter(function(fileWriter) {
          fileWriter.onwriteend = () => resolve();
          fileWriter.onerror = reject;
          fileWriter.write(new Blob([data], { type: "text/plain" }));
        }, reject);
      }, reject);
    }, reject);
  });
}