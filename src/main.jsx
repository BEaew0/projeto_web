import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 1. Import BrowserRouter
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter> {/* 2. Wrap your App with it */}
    <App />
  </BrowserRouter>
)