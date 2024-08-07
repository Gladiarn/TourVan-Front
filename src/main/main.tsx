import React from 'react'
import ReactDOM from 'react-dom/client'
// import Login from '../login/login'
import Home from '../home/home'
import Navbar from '../navbar/navbar'
import About from '../About/About'
import Deals from '../Deals/Deals'
import Quote from '../Quote/Quote'
import Footer from '../Footer/Footer'
import Popular from '../Popular/Popular'
import Quote2 from '../Quote2/Quote2'
import './main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Navbar />
    <Home />
    <About />
    <Deals />
    <Quote />
    <Popular />
    <Quote2 />
    <Footer />
  </React.StrictMode>,
)
