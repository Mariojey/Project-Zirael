import styles from './Login.module.css';
import logo from '../../media/logo.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as tokenHandler from '../../modules/TokenHandler';

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

    function login() {
        fetch("http://localhost:3001/auth/signin", 
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
                
                navigation("/home")
            }
            else(
                console.log(data.message)
            )
        })
    }


    return (
        <div className={styles.mainContainer}>
            <div className={styles.loginBox}>
                <div className={styles.logo}>
                    <img src={logo} alt="logo"></img>
                    <h1>ZIRAEL</h1>
                </div>

                <input onChange={handleFormUpdate} value={formData.login} name="login" type="text" />
                <input onChange={handleFormUpdate} value={formData.password} name="password" type="password" />
                <div onClick={toggleRemember} className={styles.checkBox}>
                    <input checked={remember} type="checkbox"></input>
                    <p>Zapamiętaj logowanie</p>
                </div>
                <button onClick={login}>Zaloguj</button>
                <hr></hr>
                <button onClick={() => navigation("/register")}>REJESTRACJA</button>
            </div>
        </div>
    );
}

export default Login;