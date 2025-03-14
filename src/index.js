import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // IN development react render everything twice, so we get consoles twice
  // this happens only in strict mode, react check whether there is any inconsitency or not, so it render twice.
  // there is ntg wrong in this, if u want u could comment strict mode
  // <React.StrictMode>
    <App />
  // </React.StrictMode> 

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
