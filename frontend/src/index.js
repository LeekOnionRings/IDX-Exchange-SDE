import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Proxy server
/*import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
const app = express(); 
const PORT = 3000;
const HOST = "localhost";
const API_URL = "http://localhost:5000/api/properties"
app.get("/status", (req, res, next) => {
  res.send("This is a proxy service.");
})
const proxyOptions = {
  target: API_URL,
  changeOrigin: true,
  pathRewrite: {
    [`^/api/`]: 'properties'
  },
}
const proxy = createProxyMiddleware(proxyOptions);
app.use('/api/properties', proxy)
app.listen(PORT, HOST, () => {
  console.log(`Proxy Started at ${HOST}:${PORT}`)
});*/


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
