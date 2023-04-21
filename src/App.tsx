import React, { useState } from 'react';

import Navbar from './component/Navbar';
import Contact from './component/Contact';
import MapsChart from './component/MapsChart';
import LineCharts from './component/LineCharts';
import{
  BrowserRouter,
  Routes,
  Route,
  useParams
} from 'react-router-dom'
// import ContactList from './component/ContactList';

function App() {
  return (
    <BrowserRouter>
    <div >
      <h1 className='text-white text-4xl text-center bg-blue-500 py-2'>Contact and Maps&Charts </h1>
      <div className='flex '>
     <Navbar />
     <Routes>
    <Route path='/' element={<Contact/>}  />
    <Route path='/maps' element={<LineCharts/>}/>
     </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
