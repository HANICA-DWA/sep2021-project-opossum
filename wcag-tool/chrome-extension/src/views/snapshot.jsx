import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '../css/styles.css';
import setupStore from '../services/store';
import App from './components/editor/App';

(async () => {
  const store = await setupStore();

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
})();
