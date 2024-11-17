import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import Dashboard from './PAGES/Dashboard';

// PAGES
import Home from './PAGES/Home';
import BlogDetail from './PAGES/blogDetail';
import Pages from './PAGES/pages';
import Contact from './PAGES/Contact';
import SinglePost from './PAGES/SinglePost';
import Navbar from './PAGES/Navbar';
import Login from './PAGES/Login';
import Signup from './PAGES/Signup';
import AlertState from '../src/Context/Alert/AlertState';
import Alert from './PAGES/Alert';
import Darkmode from './PAGES/darkmode';
import AuthorBio from './PAGES/AuthorBio';

// Import ProtectedRoute for protected routes
import ProtectedRoute from './PAGES/ProtectedRoute'; // Add this import

function App() {

  return (
    <AlertState>
      <BrowserRouter>
        <Darkmode />
        <Navbar />
        <Alert />
        <main>
          <Routes>
           
            <Route index element={<Home />} />

            <Route path='/SinglePost' element={<SinglePost />} />

            <Route path='/blog/:id' element={<BlogDetail />} />

            <Route path="/author/:authorName" element={<AuthorBio />} />

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

            <Route path='/Login' element={<Login />} />
            <Route path='/Signup' element={<Signup />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AlertState>
  );
}

export default App;
