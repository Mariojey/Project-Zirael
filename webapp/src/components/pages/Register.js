import styles from './Register.module.css';
import logo from '../../media/logo.png'
import AsyncSelect from 'react-select/async'
import Select from 'react-select'

import Globals from '../../modules/Globals'

import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Register(props) {
    const navigation = useNavigate();

    const [formData, setFormData] = useState({
        login: "",
        password: "",
        passwordRepeat: "",
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

    function handleGenderChange(option) {
        setFormData(prevState => {
            return ({
                ...prevState,
                gender: option.value
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

    

    const customStyles = {
        container: (provided, state) => ({
            ...provided,
            padding: "none",
            width: "100%",
        }),
        control: (provided, state) => ({
            ...provided,
            height: "3rem",
            
            border: "none",
            outline: "none",
            borderRadius: '10px',
            backgroundColor: 'rgba(255,255,255,0.15)'
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            height: "3rem",
            padding: "none",
            paddingLeft: "1rem",
        }),
        input: (provided, state) => ({
            ...provided,
            padding: "none",
            color: "white",
        }),
        singleValue: (provided, state) => ({
            ...provided,
            padding: "none", 
            color: "white",
        }),
      }

    function register(e) {
        e.preventDefault();

        if(formData.login.length < 4) {
            toast.error("Login jest zbyt krótki", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            return;
        }

        if(formData.password.length < 8) {
            toast.error("Hasło musi mieć minimum 8 znaków", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            return;
        }

        if(formData.password !== formData.passwordRepeat) {
            toast.error("Hasła nie są identyczne", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            return;
        }

        if(formData.name.length < 3) {
            toast.error("Nazwa użytkownika jest zbyt krótka", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            return;
        }

        if(formData.cityid === "") {
            toast.error("Wybierz miasto", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            return;
        }

        if(formData.age < 0 || formData.age > 150) {
            toast.error("Podaj prawidłowy wiek", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            return;
        }

        if(formData.gender === "") {
            toast.error("Wybierz płeć", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            return;
        }

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
            //console.log(data)
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


    const genders = [
        { value: "male", label: "Mężczyzna" },
        { value: "female", label: "Kobieta" },
        { value: "other", label: "Inna" },
        { value: "hidden", label: "Wolę nie podawać" },
    ]

    return (
        <div className={styles.mainContainer}>
            <form onSUbmit={register} className={styles.loginBox}>
                <div className={styles.logo}>
                    <img src={logo} alt="logo"></img>
                    <h1>REJESTRACJA</h1>
                </div>
                <p className={styles.label}>Login</p>
                <input onChange={handleFormUpdate} value={formData.login} name="login" type="text" placeholder='Login'/>
                <p className={styles.label}>Hasło</p>
                <input onChange={handleFormUpdate} value={formData.password} name="password" type="password" placeholder='Hasło'/>
                <p className={styles.label}>Powtórz hasło</p>
                <input onChange={handleFormUpdate} value={formData.passwordRepeat} name="passwordRepeat" type="password" placeholder='Powtórz hasło'/>
                <p className={styles.label}>Nazwa użytkownika (wyświetlana)</p>
                <input onChange={handleFormUpdate} value={formData.name} name="name" type="text" placeholder='Nazwa użytkownika'/>
                <p className={styles.label}>Miasto</p>
                <AsyncSelect
                    placeholder='Miasto'
                    styles={customStyles}
                    loadOptions={loadOptions}
                    onChange={item => handleCityUpdate(item)}
                />
                <p className={styles.label}>Płeć</p>
                <Select
                    styles={customStyles}
                    name="gender"
                    placeholder="Płeć"
                    options={genders}
                    value={formData.gender}
                    onChange={handleGenderChange}
                />
                <p className={styles.label}>Wiek</p>
                <input onChange={handleFormUpdate} value={formData.age} name="age" type="number" placeholder='Wiek'></input>
                <p className={styles.rodoText}>Kilkając przycisk "zarejestruj" wyrażasz zgodę na przetwarzanie twoich danych osobowych na potrzeby wyświetlenia statystyk w aplikacji. </p>

                

                <button onClick={register}>ZAREJESTRUJ</button>
                <hr></hr>
                <button onClick={() => navigation("/login")}>LOGOWANIE</button>
            </form>
        </div>
    );
}

export default Register;