import './App.css'
import {router} from './router.tsx'
import { RouterProvider } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <div className="app">
      <RouterProvider router={router}></RouterProvider>
    </div>
  ) 
}

export default App;
