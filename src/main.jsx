import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


/**
 * Entry point of the React application.
 * Creates a root container and renders the App component.
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  // React.StrictMode is a tool for highlighting potential problems in an application.
  // It does not render any visible UI. It activates additional checks and warnings for its descendants.
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
