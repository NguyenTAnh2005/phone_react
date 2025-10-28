import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Header } from './Layout/header'
import { Footer } from './Layout/footer'
import { Home } from './Pages/Home'
import { Phones } from './Pages/Phones'
import { ProductDetails } from './Pages/ProductDetails'
import { Articles } from './Pages/Articles'
import { Deals } from './Pages/Deals'
import { Contact } from './Pages/Contact'
import { LogIn } from './Pages/Login'
import { SignUp } from './Pages/Signup'
import { ForgotPassword } from './Pages/Forgotpassword'
/* Import for router DOM*/
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'

function AppContent() {
  const location = useLocation();
  const hideHeaderFooter = ["/log-in", "/sign-up", "/forgot-password"].includes(location.pathname);
  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route index element={<Home />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Deals' element={<Deals />} />
        <Route path='/Phones' element={<Phones />} />
        <Route path='/Articles' element={<Articles />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/log-in' element={<LogIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
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
