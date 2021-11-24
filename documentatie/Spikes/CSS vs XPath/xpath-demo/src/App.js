import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import getXPath from 'get-xpath';

function App() {
  const [selector, setSelector] = useState('');

  document.querySelectorAll('*').forEach(element => {
    element.addEventListener('mouseover', event => {
      //if event.target is body or html, don't change the border
      if (event.target.tagName === 'BODY' || event.target.tagName === 'HTML') {
        return;
      }
      const xpath = getXPath(event.target);
      const el = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
      // change the border of the element
      el.style.border = '1px solid red';

      setSelector(xpath);
    });
    element.addEventListener('mouseout', event => {
      if (event.target.tagName === 'BODY' || event.target.tagName === 'HTML') {
        return;
      }
      // change the border of the element
      event.target.style.border = 'none';
    });
  });
  return (
    <>
      <h1>selector: {selector}</h1>
      <h1>
        My First <b>Heading</b>
      </h1>
      <p>My first paragraph.</p>
      <ul>
        <li>1. fsd</li> <li>2. fsda</li>
      </ul>
      <b>fsdsfd</b>
    </>
  );
}

export default App;
