import React from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

//PAGES
import Home from './PAGES/Home'
import Bloglisting from './PAGES/Bloglisting';
import Pages from './PAGES/pages'
import Contact from './PAGES/Contact'
import SinglePost from './PAGES/SinglePost';
import Navbar from './PAGES/Navbar';
import Login  from './PAGES/Login';
import Signup  from './PAGES/Signup'
function App() {
  
    return (
     <BrowserRouter>
        {/* Navlinks are in this files below */}
        
        <Navbar />  

      
      <main>
       
        <Routes>
          <Route index element={<Home />} />
          <Route path='/blog' element={<Bloglisting />} />
          <Route path='singlePost' element = {<SinglePost />} />   
          <Route path='pages' element = {<Pages />} />  
          <Route path='/contact' element={<Contact />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
        </Routes>
      
      </main>
      
      
     
     </BrowserRouter>
    );
  
}

export default App;