import styles from './PollCreator.module.css'
import * as tokenHandler from '../../modules/TokenHandler';

import Globals from '../../modules/Globals'

import Select from "react-select";
import AsyncSelect from 'react-select/async'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


import NavBar from './NavBar';

function PollCreator(props) {
    const navigation = useNavigate();

    const [tags, setTags] = useState({
        multiValue: [],
        filterOptions: [
          { value: "lifestyle", label: "lifestyle" },
          { value: "polityka", label: "polityka" },
          { value: "rozrywka", label: "rozrywka" }
        ]
      })

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
        setOptionInput(event.target.value)
        console.log(event.target.value)
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

    function addOption() {
        setFormData(prevState => {
            
            var newOptions = prevState.options

            if(newOptions.indexOf(optionInput) === -1) {
                newOptions.push(optionInput)
            }

            return {
                ...prevState,
                options: newOptions
            }
            
        })
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
                console.log("Success!")
            }
            else(
                console.log(data.message)
            )
        })
    }


    useEffect(() => {
        verifyCredentials();
    }, []);
    
    return (
        <div className={styles.mainContainer}>
            <NavBar nav={navigation} />
            <div className={styles.formContainer}>
                <input      value={formData.title} onChange={handleChange} name="title" placeholder="title" type="text"></input>
                <textarea   value={formData.description} onChange={handleChange} name="description"  placeholder="descirption"></textarea>
                <div className={styles.optionAdder}>
                    <input value={optionInput} onChange={handleOptionInput} type="text"></input>
                    <button onClick={addOption}>Dodaj</button>
                </div>
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
                <AsyncSelect
                    placeholder='Miasto'
                    className={styles.select}
                    loadOptions={loadOptions}
                    onChange={handleCityChange}
                />
                <Select
                    isMulti
                    name="tags"
                    placeholder="Tags"
                    options={tags.filterOptions}
                    value={tags.multiValue}
                    onChange={handleMultiChange}
                />
                <select value={formData.region} onChange={handleChange} name="range" placeholder='Zasięg Ankiety'>
                    <option hidden disabled selected value>--- Zasięg ankiety ---</option>
                    <option value="local">Gmina</option>
                    <option value="regional">Powiat</option>
                    <option value="provintial">Województwo</option>
                    <option value="global">Cały kraj</option>
                </select>
                <label><input checked={formData.resultsPublic} onChange={toggleCheckbox} name="resultsPublic" type="checkbox" /> Make statistics public </label>

                <button onClick={createForm}>Stwórz Ankietę</button>
            </div>
        </div>
    );
}

export default PollCreator;