import React from 'react';
import './App.css';
import {BrowserRouter,Routes,Route,Link,NavLink} from 'react-router-dom'

//PAGES
import Home from './PAGES/Home'
import Bloglisting from './PAGES/Bloglisting';
import Pages from './PAGES/pages'
import Contact from './PAGES/Contact'
import SinglePost from './PAGES/SinglePost';

function App() {
  
    return (
     <BrowserRouter>
      <header className='h1'>
        <nav className='flex items-center justify-center  text-white mt-3'>
          <div className='company text-white text-xl mr-3'>Meta <span className='font-extrabold'>Blog</span> </div>
          <ul className='flex space-x-12'>
            <li className='ml-[80px]'><NavLink to='/' >Home</NavLink></li>
            <li><NavLink to='Blog'>Blog</NavLink></li>
            <li> <NavLink to='singlePost'>Single Post</NavLink></li>
            <li><NavLink to='Pages'>Pages</NavLink></li>
            <li><NavLink to='Contact'>Contact</NavLink></li>
          </ul>
                        {/* KAM HOGYA BAS SPACING KARNI HAI */}
          
         
          
          

          <div>
          <input type="text" placeholder='Search' className='pl-3 bg-custom-gray ml-32 p-2 rounded-md' />
          </div>


        </nav>

      </header>
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/blog' element={<Bloglisting />} />
          <Route path='singlePost' element = {<SinglePost />} />   
          <Route path='pages' element = {<Pages />} />   

          <Route path='/contact' element={<Contact />} />
        </Routes>
      </main>
      
      
     
     </BrowserRouter>
    );
  
}

export default App;