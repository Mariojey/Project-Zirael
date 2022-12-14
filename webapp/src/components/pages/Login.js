import styles from './Login.module.css';
import logo from '../../media/logo.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as tokenHandler from '../../modules/TokenHandler';

import { toast } from 'react-toastify';

import Globals from '../../modules/Globals'


function Login(props) {
    const navigation = useNavigate();

    const [formData, setFormData] = useState({
        login: "",
        password: "",
    });

    const [remember, setRemember] = useState(true)

    function toggleRemember() {
        setRemember(prevState => !prevState)
    }

    function handleFormUpdate(event) {
        const target = event.currentTarget;

        if(target.name) {
            setFormData(prevState => {
                return ({
                    ...prevState,
                    [target.name]: target.value
                })
            })
        }
    }

    function login(e) {
        e.preventDefault();

        const loginalert = toast.loading("Logowanie...", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })

        fetch(`${Globals.apiUrl}/auth/signin`, 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(response => response.json())
        .then(data => {
            if(data.status === "OK")
            {
                const user = data.user
                const token = data.token
                
                if(remember) {
                    tokenHandler.saveTokenData(user, token)
                }
                else {
                    tokenHandler.tempSaveTokenData(user, token)
                }
                
                toast.update(loginalert, { 
                    render: "Sukces!", 
                    type: "success", 
                    isLoading: false,
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",  
                });

                navigation("/home")
            }
            else {
                toast.update(loginalert, { 
                    render: "Logowanie nie powiod??o si??!", 
                    type: "error",
                    isLoading: false,
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark", 
                }
                );
                //console.log(data.message)
            }
        })
    }


    return (
        <div className={styles.mainContainer}>
            <form onSubmit={login} className={styles.loginBox}>
                <div className={styles.logo}>
                    <img src={logo} alt="logo"></img>
                    <h1>LOGOWANIE</h1>
                </div>

                <p className={styles.label}>Login</p>
                <input onChange={handleFormUpdate} value={formData.login} name="login" type="text" placeholder="Login" />
                <p className={styles.label}>Has??o</p>
                <input onChange={handleFormUpdate} value={formData.password} name="password" type="password" placeholder="Has??o" />
                <div onClick={toggleRemember} className={styles.checkBox}>
                    <input checked={remember} type="checkbox"></input>
                    <p>Zapami??taj logowanie</p>
                </div>
                <button onClick={login}>Zaloguj</button>
                <hr></hr>
                <button onClick={() => navigation("/register")}>REJESTRACJA</button>
            </form>
        </div>
    );
}

export default Login;