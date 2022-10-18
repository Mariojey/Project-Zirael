import styles from './App.module.css'
import * as tokenHandler from './modules/TokenHandler';
import Globals from './modules/Globals'

import { Route, Routes } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/pages/Login'
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import PollList from './components/pages/PollList';
import PollCreator from './components/pages/PollCreator';
import UserProfile from './components/pages/UserProfile';

function App() {
  const navigation = useNavigate();
  function verifyCredentials() {
      tokenHandler.verifyCredentials()
      .then(data => {
          if(data.status === "OK")
          {
            navigation("/home")
          }
          else
          {
            navigation("/login")
          }
      })
    }

    useEffect(() => {
      verifyCredentials();

    }, [])

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/polls" element={<PollList />} />
        <Route path="/create" element={<PollCreator />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
