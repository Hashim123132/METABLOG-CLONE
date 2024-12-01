import React, { useEffect,useRef } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'; // Import useLocation
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // Import transition group

// PAGES
import Home from './PAGES/Home';
import BlogDetail from './PAGES/blogDetail';
import Pages from './PAGES/pages';
import Contact from './PAGES/Contact';
import SinglePost from './PAGES/SinglePost';
import Navbar from './PAGES/Navbar';
import Login from './PAGES/Login';
import Signup from './PAGES/Signup';
import AlertState from './Context/Alert/AlertState';
import Alert from './PAGES/Alert';
import Darkmode from './PAGES/darkmode';
import AuthorBio from './PAGES/AuthorBio';
import Dashboard from './PAGES/Dashboard';
import BlogDetail2 from './PAGES/blogdetail2';  // Import the new BlogDetail2 component

import ProtectedRoute from './PAGES/ProtectedRoute'; // Import ProtectedRoute for protecting the Dashboard

// Import GoogleOAuthProvider
import { GoogleOAuthProvider } from '@react-oauth/google';

// A separate component to handle route transitions
const RouteTransitions = () => {
  const location = useLocation(); // useLocation hook to track route changes
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on route change
  }, [location]); // Dependency on location to trigger on route change

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key} // Ensure unique transition key for each route change
        timeout={500} // Duration of transition
        classNames="parallax" // Use the class names for the CSS transition

      >
        <Routes location={location}>
          <Route index element={<Home />} />
          <Route path='/SinglePost' element={<SinglePost />} />
          
          {/* Routes for blog details */}
          
          <Route path='/blog/:id' element={<BlogDetail />} /> 
          <Route path='/blogs/:id' element={<BlogDetail2 />} /> 

          {/* Author Bio page */}
          <Route path="/author/:authorName" element={<AuthorBio />} />

          {/* Static Pages */}
          <Route path='/Pages' element={<Pages />} />
          <Route path='/Contact' element={<Contact />} />

          {/* Use ProtectedRoute for Dashboard */}
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Auth Routes */}
          <Route path='/Login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

function App() {
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <AlertState>
      <GoogleOAuthProvider clientId={CLIENT_ID}> {/* Wrap your app with GoogleOAuthProvider */}
        <BrowserRouter>
          <Darkmode />
          <Navbar />
          <Alert />
          <main>
            <RouteTransitions />
          </main>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </AlertState>
  );
}

export default App;
