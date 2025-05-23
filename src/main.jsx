import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeShifts } from './utils/storageManager.js'
import './index.css'
import App from './App.jsx'

initializeShifts()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
