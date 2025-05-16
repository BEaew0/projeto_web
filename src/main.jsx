import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 1. Import BrowserRouter
import { TemaProvider } from "./componentes/header/menu_/mudar_tema/mudar_tema";
import App from './App.jsx'
import LayoutLC from './Layout_Auth.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter> {/* 2. Wrap your App with it */}
    <App />

  </BrowserRouter>
)