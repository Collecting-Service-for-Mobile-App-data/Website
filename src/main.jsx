// Import React and ReactDOM for use in the application.
import React from 'react'
import ReactDOM from 'react-dom/client'
// Import the main App component that contains the application's structure and logic.
import App from './App.jsx'
// Import global styles from index.css.
import './index.css'


// Create a root container where the React application will attach.
// This uses the new ReactDOM.createRoot API from React 18 for concurrent features.
ReactDOM.createRoot(document.getElementById('root')).render(
  // React.StrictMode is a tool for highlighting potential problems in an application.
  // It does not render any visible UI. It activates additional checks and warnings for its descendants.
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
