import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Main Components
import Navbar from '../navbar/navbar';
import Home from '../home/home';
import About from '../About/About';
import Deals from '../Deals/Deals';
import Quote from '../Quote/Quote';
import Popular from '../Popular/Popular';
import Quote2 from '../Quote2/Quote2';
import Footer from '../Footer/Footer';
import Dashboard from '../Dashboard/dashboard';
import FormTour from '../Forms/FormTour';

// LoginPage Component
import LoginPage from "../LoginPage/LoginPage";

import './main.css';
import FormVan from '../Forms/FormVan';

const App = () => {
  // Move useRef declarations here, inside the App function
  const HomeRef = useRef(null);
  const DealsRef = useRef(null);
  const AboutRef = useRef(null);
  const FooterRef = useRef(null);

  return (
    <Router>
      <Routes>
        {/* Route for the home page and other main content */}
        <Route
          path="/"
          element={
            <>
              <div>
                {/* Pass the refs as props to the Navbar */}
                <Navbar HomeRef={HomeRef} AboutRef={AboutRef} DealsRef={DealsRef} FooterRef={FooterRef} />
              </div>

              {/* Attach refs to the corresponding sections */}
              <div ref={HomeRef}>
                <Home />
              </div>

              <div ref={AboutRef}>
                <About />
              </div>

              <div ref={DealsRef}>
                <Deals />
              </div>

              <Quote />

              <Popular />

              <Quote2 />

              <div ref={FooterRef}>
                <Footer />
              </div>
            </>
          }
        />

        {/* Route for the van form page */}
        <Route path="/formvan" element={<FormVan />} />

         {/* Route for the tour van page */}
         <Route path="/formtour" element={<FormTour />} />

        {/* Route for the login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route for dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
