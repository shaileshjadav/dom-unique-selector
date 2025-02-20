import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { StyleSheetManager } from 'styled-components';

// get our shadow HOST
let host = document.querySelector('#react-app');
if(!host){
  host = document.createElement("div");
  host.id = "react-app";
  document.body.appendChild(host);
}


const shadow = host.attachShadow({mode:"open"});

// create the element where we would render our app
const renderIn = document.createElement('div');
shadow.appendChild(renderIn);


// Add styles 
const styleSlot = document.createElement('section');

let style = document.createElement('style');
style.type = 'text/css';
styleSlot.prepend(style);

shadow.prepend(styleSlot);



ReactDOM.createRoot(renderIn).render(
  <React.StrictMode>
    <StyleSheetManager target={styleSlot}>
    <App />
    </StyleSheetManager>
  </React.StrictMode>,
)
