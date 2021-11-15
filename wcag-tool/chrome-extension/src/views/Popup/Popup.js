import React from "react";
import "./popup.css";

const Popup = function () {
  return (
    <div className="App">
      <header className="App-header">
        <p>Popup page</p>
        <p>
          Edit <code>src/views/Popup/Popup.js</code> and save.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export { Popup };
