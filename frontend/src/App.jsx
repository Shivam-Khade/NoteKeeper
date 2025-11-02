import React from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CreateNote from './pages/CreateNote.jsx'

const App = () => {
  return (
    <div className='flex flex-col min-h-screen bg-gray-900 text-white'>
      <Navbar />
      <main className='flex-1 container mx-auto p-4'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateNote />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App