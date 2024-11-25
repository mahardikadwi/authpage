import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthProvider.jsx'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </AuthProvider>
      </Router>
  </StrictMode>,
)
