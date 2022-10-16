import styles from './Register.module.css';
import logo from '../../media/logo.png'
import AsyncSelect from 'react-select/async'

import Globals from '../../modules/Globals'

import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Register(props) {
    const navigation = useNavigate();

    const [formData, setFormData] = useState({
        login: "",
        password: "",
        name: "",
        city: "",
        cityid: "",
        gender: "",
        age: 0
      }
    )


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

    function handleCityUpdate(event) {
        const city= event.label;
        const cityid = event.value

        setFormData(prevState => {
            return ({
                ...prevState,
                city: city,
                cityid: cityid
            })
        })
    }
    function loadOptions(input, callback) {
        fetch(`${Globals.apiUrl}/region/find/${input}`)
            .then((response) => {
                return response.json();
            }).then((json) => {
                const results = json.map(object => {
                    return ({
                        value: object.id, 
                        label: object.name,
                    })
                })

                callback(results)
            });
    }


    function register() {
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

        fetch(`${Globals.apiUrl}/auth/signup`, 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.status === "OK")
            {
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
                navigation("/login")
            }
            else {
                toast.update(loginalert, { 
                    render: `${data.message}!`, 
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
                });
            }
        })
    }


    return (
        <div className={styles.mainContainer}>
            <div className={styles.loginBox}>
                <div className={styles.logo}>
                    <img src={logo} alt="logo"></img>
                    <h1>ZIRAEL</h1>
                </div>

                <input onChange={handleFormUpdate} value={formData.login} name="login" type="text" placeholder='Login'/>
                <input onChange={handleFormUpdate} value={formData.password} name="password" type="password" placeholder='Hasło'/>
                <input onChange={handleFormUpdate} value={formData.name} name="name" type="text" placeholder='Nazwa użytkownika'/>
                    
                <AsyncSelect
                    placeholder='Miasto'
                    className={styles.select}
                    loadOptions={loadOptions}
                    onChange={item => handleCityUpdate(item)}
                />

                <select onChange={handleFormUpdate} name="gender" placeholder='Płeć'>
                    <option hidden disabled selected value>--- Płeć ---</option>
                    <option value="male">Mężczyzna</option>
                    <option value="female">Kobieta</option>
                    <option value="other">Inna</option>
                    <option value="hidden">Wolę nie podawać</option>
                </select>

                <input onChange={handleFormUpdate} value={formData.age} name="age" type="number" placeholder='Wiek'></input>

                

                <button onClick={register}>ZAREJESTRUJ</button>
                <hr></hr>
                <button onClick={() => navigation("/login")}>LOGOWANIE</button>
            </div>
        </div>
    );
}

export default Register;