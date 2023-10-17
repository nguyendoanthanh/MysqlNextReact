import React from 'react';
import Signup from './Signup';
import Login from './Login'
import {BrowserRouter, Routes, Route, Router} from 'react-router-dom'
import { Home } from './Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
