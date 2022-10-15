import React from "react";

import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity  } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import SearchableDropdown from "react-native-searchable-dropdown";

import GlobalVariables from "../modules/GlobalVariables";
import { Formik } from "formik";
import {getTokenData} from '../modules/Tokens';

export default function CreatePoll(){
    
    const [optionInput, setOptionInput] = React.useState(""); 
    const [options, setOptions] = React.useState([]);
    const [tags, setTags] = React.useState([]);
    const [region, setRegion] = React.useState();
    const [isSelected, setIsSelected] = React.useState(true)
    const [selected, setSelected] = React.useState("");
    const [data, setData] = React.useState([]);
    const [selectedCity, setSelectedCity] = React.useState({});

    function handleOptionInput(text) {
        setOptionInput(text)
    }

    function handleRegionChange(object) {
      setRegion(object)
    }

    function handleAddOption() {
      setOptions(prevState => {
        return [...prevState, optionInput]
      })

      setOptionInput("")
    }

    function handleRemoveOption(index) {
      console.log(index)
      setOptions(prevState => {
        prevState.splice(index, 1)
        return [...prevState]
      });

    }

    function sendPoll(title, description) {
        console.log("submit?")
        
        getTokenData()
        .then(tokenData => {
          const tempTags = tags.map(tag => tag.id)

          fetch(`${GlobalVariables.apiUrl}/polls/create`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              token: tokenData.token,
              user: tokenData.user,
              title: title,
              description: description,
              //Select as city
              tags: tempTags,
              options: options,
              resultsPublic: isSelected,
              range: region.id,
              //Z Registration
              city: selectedCity.name,
              cityid: selectedCity.id,
            })
          })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            
            
            if (response.status === 'OK') {
              return (
                  console.log('Dodano ankiete')
              )
            }
          })
        })
    }
    function fetchCities(name) {
        fetch(`${GlobalVariables.apiUrl}/region/find/${name}`)
          .then((response) => response.json())
          .then((json) => {
              const results = json.map(object => {
                  return ({
                      id: object.id, 
                      name: object.name,
                  })
              })
  
              setData(results);
          });
      }
    function setCityHandler(item) {
        setSelectedCity(item);
      }
    
    const tagList = [
      { id: "lifestyle",    name: "lifestyle" },
      { id: "polityka",     name: "polityka" },
      { id: "rozrywka",     name: "rozrywka" },        
      { id: "nauka",        name: "nauka" },
      { id: "technika",     name: "technika" },
      { id: "społeczność",  name: "społeczność" },
      { id: "finanse",      name: "finanse" },
      { id: "kultura",  name: "kultura" },
      { id: "prawo",        name: "prawo" },
      
    ]

    const regionList = [
      { id: "local",        name: "Gmina" },
      { id: "regional",     name: "Powiat" },
      { id: "provintial",   name: "Województwo" },
      { id: "global",       name: "Cała Polska" },
    ]

    return(
        <View style={styles.homeContainer}>
            <Text style={styles.homeText}>Add Poll</Text>
            <Formik
            initialValues={{token: '', user: '', title: '', description: '', tags: '', options: '', resultsPublic: '', range: '', city: '', cityid: ''}}
            onSubmit={(values) => {
                console.log("może działa");
            }}
            >{(props) => (
                <View style={styles.formContainer}>
                    <TextInput 
                        style={styles.input}
                        placeholder='Podaj tytuł ankiety społecznej'
                        onChangeText={props.handleChange('title')}
                        value={props.values.title}
                    />
                    <TextInput
                       style={styles.description} 
                       placeholder='Opisz ankietę, podaj czego ma dotyczyć i napisz jaki jest jej cel, (opcjonalnie podaj odnośniki prawne)...'
                       onChangeText={props.handleChange('description')}
                       value={props.values.description}
                    />

                    <View style={styles.optionAdder}>
                      <TextInput
                        style={styles.optionInput}
                        placeholder="Dodaj opcję"
                        onChangeText={handleOptionInput}
                        value={optionInput}
                      />
                      <Button onPress={handleAddOption} style={styles.optionAddButton} title="DODAJ"/>
                    </View>

                    <View style={styles.optionList}>
                      {options.map((option, index) => {
                        return (
                          <View key={index} style={styles.optionBox}>
                            <Text style={styles.optionText}>{option}</Text>
                            <Button onPress={() => {handleRemoveOption(index)}} style={styles.optionRemove} title="USUŃ"/>
                          </View>
                        )
                      })}
                    </View>
                    <SearchableDropdown
                        onItemSelect={setCityHandler}
                        containerStyle={{ padding: 5 }}
                        onRemoveItem={(item, index) => {
                          console.log(item)
                        }}
                        itemStyle={{
                          padding: 10,
                          marginTop: 2,
                          backgroundColor: '#ddd',
                          borderColor: '#bbb',
                          borderWidth: 1,
                          borderRadius: 5,
                        }}
                        itemTextStyle={{ color: '#222' }}
                        itemsContainerStyle={{ maxHeight: 140 }}
                        items={data}
                        defaultIndex={2}
                        resetValue={false}
                        textInputProps={
                          {
                            placeholder: "placeholder",
                            underlineColorAndroid: "transparent",
                            style: {
                                padding: 12,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                borderRadius: 5,
                            },
                            onTextChange: text => fetchCities(text)
                          }
                        }
                        listProps={
                          {
                            nestedScrollEnabled: true,
                          }
                        }
                    />   
                    <SearchableDropdown
                      multi={true}
                      selectedItems={tags}
                      onItemSelect={(item) => {
                        const items = tags;
                        items.push(item)
                        setTags(items);
                      }}
                      containerStyle={{ padding: 5 }}
                      onRemoveItem={(item, index) => {
                        const items = tags.filter((sitem) => sitem.id !== item.id);
                        setTags(items);
                      }}
                      itemStyle={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: '#ddd',
                        borderColor: '#bbb',
                        borderWidth: 1,
                        borderRadius: 5,
                      }}
                      itemTextStyle={{ color: '#222' }}
                      itemsContainerStyle={{ maxHeight: 140 }}
                      items={tagList}
                      defaultIndex={2}
                      chip={true}
                      resetValue={false}
                      textInputProps={
                        {
                          placeholder: "placeholder",
                          underlineColorAndroid: "transparent",
                          style: {
                              padding: 12,
                              borderWidth: 1,
                              borderColor: '#ccc',
                              borderRadius: 5,
                          },
                          onTextChange: text => console.log(text)
                        }
                      }
                      listProps={
                        {
                          nestedScrollEnabled: true,
                        }
                      }
                    />
                    <SearchableDropdown
                        onItemSelect={handleRegionChange}
                        containerStyle={{ padding: 5 }}
                        onRemoveItem={(item, index) => {
                          console.log(item)
                        }}
                        itemStyle={{
                          padding: 10,
                          marginTop: 2,
                          backgroundColor: '#ddd',
                          borderColor: '#bbb',
                          borderWidth: 1,
                          borderRadius: 5,
                        }}
                        itemTextStyle={{ color: '#222' }}
                        itemsContainerStyle={{ maxHeight: 140 }}
                        items={regionList}
                        defaultIndex={2}
                        resetValue={false}
                        textInputProps={
                          {
                            placeholder: "placeholder",
                            underlineColorAndroid: "transparent",
                            style: {
                                padding: 12,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                borderRadius: 5,
                            },
                            onTextChange: text => console.log(text)
                          }
                        }
                        listProps={
                          {
                            nestedScrollEnabled: true,
                          }
                        }
                    />
                    <TouchableOpacity 
                      onPress={() => setIsSelected(s => !s)}
                      style={isSelected ? styles.checkboxSelected : styles.checkboxUnselected}
                      
                    />
                    <Button 
                      title="Stwórz ankietę"
                      onPress={() => sendPoll(props.values.title, props.values.description)}
                    />
                </View>
            )}

            </Formik>
            
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
    containerText: {
      color: '#fff',
      fontSize: 30,
    },
    homeContainer: {
      flex: 1,
      backgroundColor: '#000',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
    homeText: {
      color: '#fff',
      fontSize: 30,
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    input: {
      backgroundColor: '#fff',
      color: '#000'
    },
    optionAdder: {
      display: 'flex',
      flexDirection: 'row',
      width: '95%',
      marginBottom: 15,
    },
    optionInput: {
      backgroundColor: '#fff',
      color: '#000',
      width: '80%',
      height: '100%',
    },
    optionAddButton: {
      height: 20,
      width: '20%',
    },
    optionList: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#222',
      borderRadius: 10
    },
    optionBox: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      overflow: 'hidden',
      alignItems: 'center',
      borderRadius: 10,
      width: `95%`,
      backgroundColor: '#444',
      marginBottom: 10,
    },
    optionText: {
      width: '80%',
      color: '#fff',
      paddingLeft: 10
    },
    optionRemove: {
      width: '20%'
    },
    description: {
        color: '#fff',
    },
    checkboxSelected: {
      width: 20,
      height: 20,
      backgroundColor: "#66f"
    },
    checkboxUnselected: {
      width: 20,
      height: 20,
      backgroundColor: "#fff"
    }
  });
