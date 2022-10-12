import styles from './App.module.css'
import * as tokenHandler from './modules/TokenHandler';

import { Route, Routes } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Login from './components/pages/Login'
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import PollList from './components/pages/PollList';

function App() {
  const navigation = useNavigate();

    function verifyCredentials() {
        const data = tokenHandler.getTokenData();

        fetch("http://localhost:3001/auth/verifytoken", 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: data.user, token: data.token})
        }).then(response => response.json())
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
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/polls" element={<PollList />} />
    </Routes>
  );
}

export default App;
