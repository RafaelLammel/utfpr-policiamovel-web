import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Routes from "./routes";
import {AuthProvider} from "./contexts/auth";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
  </React.StrictMode>
)
