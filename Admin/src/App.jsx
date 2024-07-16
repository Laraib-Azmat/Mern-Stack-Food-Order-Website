import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import {Routes,Route} from 'react-router-dom';
import Add from './Components/Pages/Add/Add';
import List from './Components/Pages/List/List';
import Orders from './Components/Pages/Orders/Orders';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

    const url = 'http://localhost:4000';

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add  url={url} />} />
          <Route path='/list' element={<List   url={url}/>} />
          <Route path='/orders' element={<Orders url={url}  />} />
        </Routes>
      </div>
    </div>
  )
}

export default App