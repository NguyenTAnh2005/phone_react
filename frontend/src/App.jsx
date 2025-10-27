import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Header } from './Layout/header'
import { Footer } from './Layout/footer'
import { Home } from './Pages/Home'
import { Phones } from './Pages/Phones'
import { ProductDetails } from './Pages/ProductDetails'
/* Import for router DOM*/
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'

function AppContent() {
  const location = useLocation();
  const hideHeaderFooter = ["/login", "/signup", "/forgot-password"].includes(location.pathname);
  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route index element={<Home />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Phones' element={<Phones />} />
        <Route path='/product-details' element={<ProductDetails />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  )
}
function App() {
  return (
    <>
      <Router>
        <AppContent />
      </Router>
    </>
  );
}

export default App
