import logo from './logo.svg';
import './App.css';
import ReactTooltip from 'react-tooltip';
import { useEffect, useState } from 'react';
import unique from 'unique-selector';
var csspath = require('cssman');

function App() {
  const [selector, setSelector] = useState('');  

  useEffect(() => {
  document.querySelectorAll('*').forEach(element => {
    element.addEventListener('click', event => {
     
     
      //if event.target is body or html, don't change the border
      if (event.target.tagName === 'BODY' || event.target.tagName === 'HTML'|| event.target !== element) {
        return;
      }
      // change the border of the element
      console.time('unique');
       const selector = unique(event.target);
      
        //console.time('select');
       const el = document.querySelector(selector);
        //console.timeEnd('select');
         console.timeEnd('unique');
     el.style.border = '1px solid red';

     
      setSelector(selector);
    });
    element.addEventListener('mouseout', event => {
      if (event.target.tagName === 'BODY' || event.target.tagName === 'HTML') {
        return;
      }
      // change the border of the element
      event.target.style.border = 'none';
    });
  });
}, []);

  return (
    <>
      <h1> css selector: {selector}</h1>
      <h1>
        My First <b>Heading</b>
      </h1>
      <p>My first paragraph.</p>
      <ul>
        <li>1. fsd</li> <li>2. fsda</li>
      </ul>
      <b>fsdsfd</b>
      <ReactTooltip />
    </>
  );
}

export default App;
