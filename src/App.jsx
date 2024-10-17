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
        <nav className='xsm:flex items-center justify-center  text-white mt-3  '>
           
          <div className='lg:flex items-center justify-center '>
                  
            <div className='xsm:text-white text-xl text-center '>Meta
              
              <span className='font-extrabold '>Blog</span> 
              
              </div>
            
              <div >

                  <ul className='xsm:flex justify-around space-x-7 lg: flex items-center ml-10 mt-[5px] '>
                    <li ><NavLink to='/' >Home</NavLink></li>
                    <li ><NavLink  to='Blog'>Blog</NavLink></li>
                    <li > <NavLink to='singlePost'>Single Post</NavLink></li>
                    <li ><NavLink to='Pages'>Pages</NavLink></li>
                    <li ><NavLink to='Contact'>Contact</NavLink></li>
                  </ul>
              </div>
            </div>            
          
         
          
          

          <div>
          <input type="text" placeholder='Search' className='hidden lg:flex pl-3 bg-custom-gray ml-32 p-2 rounded-md' />
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