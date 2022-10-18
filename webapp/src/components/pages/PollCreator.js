import styles from './PollCreator.module.css'
import * as tokenHandler from '../../modules/TokenHandler';

import Globals from '../../modules/Globals'

import Select from "react-select";
import AsyncSelect from 'react-select/async'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import NavBar from './NavBar';
import Footer from './Footer';

function PollCreator(props) {
    const navigation = useNavigate();

    const [tags, setTags] = useState({
        multiValue: [],
        filterOptions: [
          { value: "lifestyle", label: "lifestyle" },
          { value: "polityka", label: "polityka" },
          { value: "rozrywka", label: "rozrywka" },
          { value: "nauka", label: "nauka" },
          { value: "technika", label: "technika" },
          { value: "społeczność", label: "społeczność" },
        ]
      })

    
    const regions = [
        { value: "local", label: "Gmina" },
        { value: "regional", label: "Powiat" },
        { value: "provintional", label: "Województwo" },
        { value: "global", label: "Cała Polska" },
      ]

    const [optionInput, setOptionInput] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        options: [],
        tags: [],
        resultsPublic: true,
        range: "",
        city: "",
        cityid: ""
    })

    function handleRegionChange(option) {
        setFormData(prevState => {
            return {
                ...prevState,
                range: option.value
            }
        })
    }

    function handleMultiChange(option) {
        setTags(state => {
            setFormData(prevState => {
                return {
                    ...prevState,
                    tags: option.map(option => option.value)
                }
            })
            
            return {
                ...state,
                multiValue: option
            };
        });
    }

    function handleOptionInput(event) {
        setOptionInput(prevState => {
            if(event.target.value.length > 30) {
                toast.error("Max. długość tekstu: 30 znaków", {
                    toastId: 32324,
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })

                return prevState
            }
            return event.target.value
        })
    }

    function handleCityChange(item) {
        setFormData(prevState => {
            return {
                ...prevState,
                city: item.label,
                cityid: item.value
            }
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

    function verifyCredentials() {
        tokenHandler.verifyCredentials()
        .then(data => {
            if(data.status !== "OK")
            {
                navigation("/login")
            }
        })
    }

    function addOption(e) {
        e.preventDefault();
        setFormData(prevState => {
            
            var newOptions = prevState.options

            if(newOptions.length >= 5) {
                toast.error("Nie możesz dodać więcej opcji", {
                    toastId: 32378,
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                return {...prevState}
            }

            if(newOptions.indexOf(optionInput) === -1) {
                newOptions.push(optionInput)
            }

            return {
                ...prevState,
                options: newOptions
            }
            
        })

        setOptionInput("")
    }

    function handleChange(event) {
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

    function toggleCheckbox() {
        setFormData(prevState => {
            return ({
                ...prevState,
                resultsPublic: !prevState.resultsPublic
            })
        })
    }

    function removeOption(index) {
        
        setFormData(prevState => {
            var newOptions = prevState.options
            newOptions.splice(index, 1)

            return {
                ...prevState,
                options: newOptions
            }
        })
    } 

    function createForm() {
        const userData = tokenHandler.getTokenData();
        
        console.log(userData)

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

        fetch(`${Globals.apiUrl}/polls/create`, 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...formData, user: userData.user, token: userData.token})
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
            }
            else {
                toast.update(loginalert, { 
                    render: data.message, 
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
    const customStyles = {
        container: (provided, state) => ({
            ...provided,
            padding: "none",
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

    useEffect(() => {
        verifyCredentials();
    }, []);
    
    return (
        <>
        <div className={styles.mainContainer}>
            <NavBar nav={navigation} />
            <div className={styles.formContainer}>
                <h1>KREATOR ANKIET</h1>
                <p>Tytuł ankiety</p>
                <input      value={formData.title} onChange={handleChange} name="title" placeholder="Tytuł" type="text"></input>
                <p>Opis ankiety</p>
                <textarea   value={formData.description} onChange={handleChange} name="description"  placeholder="Opis"></textarea>
                
                <p>Opcje</p>
                <form onSubmit={addOption} className={styles.optionAdder}>
                    <input value={optionInput} placeholder="Wpisz opcję" onChange={handleOptionInput} type="text"></input>
                    <button onClick={addOption}>Dodaj</button>
                </form>
                <div className={styles.optionList}>
                    {
                        formData.options.map((option, index) => {
                            return (
                                <div className={styles.option}>
                                    <p>{option}</p>
                                    <button onClick={()=> removeOption(index)}>X</button>
                                </div>
                            )
                        })
                    }
                    
                </div>
                <p>Ankietowane miasto</p>
                <AsyncSelect
                    placeholder='Miasto'
                    styles={customStyles}
                    loadOptions={loadOptions}
                    onChange={handleCityChange}
                />
                <p>Zasięg ankiety</p>
                <Select
                    styles={customStyles}
                    name="regions"
                    placeholder="Zasięg ankiety"
                    options={regions}
                    value={formData.range}
                    onChange={handleRegionChange}
                />
                <p>Kategorie</p>
                <Select
                    isMulti
                    styles={customStyles}
                    name="tags"
                    placeholder="Tagi"
                    options={tags.filterOptions}
                    value={tags.multiValue}
                    onChange={handleMultiChange}
                />
                <label><input checked={formData.resultsPublic} onChange={toggleCheckbox} name="resultsPublic" type="checkbox" />Statystyki dostępne dla wszystkich</label>

                <button onClick={createForm}>Stwórz Ankietę</button>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default PollCreator;