import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Signup from '../pages/signup';
import AuthProvider from './contexts/AuthContext';
import { Toaster } from "sonner";
import Login from '../pages/login';
import Dashboard from '../pages/Dashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <BrowserRouter>
        <AuthProvider>
          <Toaster closeButton position="top-right" richColors />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
