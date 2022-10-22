import React from "react";

import { StyleSheet, View, ScrollView, Text, TextInput, Button, TouchableOpacity  } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import SearchableDropdown from "react-native-searchable-dropdown";

import GlobalVariables from "../modules/GlobalVariables";
import { Formik } from "formik";
import { Toast } from "toastify-react-native"
import {getTokenData} from '../modules/Tokens';

export default function CreatePoll(){
    
    const [optionInput, setOptionInput] = React.useState(""); 
    const [options, setOptions] = React.useState([]);
    const [tags, setTags] = React.useState([]);
    const [region, setRegion] = React.useState({});
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
      if(optionInput === "") return
      
      if(options.indexOf(optionInput) !== -1) return

      if(options.length >= 5) return
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
        if(title.length < 3) {
          Toast.error("Tytuł jest zbyt krótki")
          return
        }

        if(options.length < 2) {
          Toast.error("Zbyt mało opcji")
          return
        }

        if(!region.id) {
          Toast.error("Wybierz zasięg ankiety")
          return
        }

        if(!selectedCity.id) {
          Toast.error("Wybierz miasto")
          return
        }

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
            if (response.status === 'OK') {
              Toast.success("Dodano ankietę!")
              return
            }
            Toast.error("Wystąpił problem!")
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
      { id: "kultura",      name: "kultura" },
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
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.cardContainer}>
              <View style={styles.formHeader}>
                <Text style={styles.formHeaderText}>
                  KREATOR ANKIET
                </Text>
              </View>
            <Formik
            initialValues={{token: '', user: '', title: '', description: '', tags: '', options: '', resultsPublic: '', range: '', city: '', cityid: ''}}
            onSubmit={(values) => {
                console.log("może działa");
            }}
            >{(props) => (
                <View style={styles.formContainer}>
                    <Text style={styles.inputTitle}>Tytuł ankiety</Text>
                    <TextInput 
                        style={styles.input}
                        maxLength={40}
                        placeholder='Podaj tytuł ankiety społecznej'
                        placeholderTextColor="#ffffff99"
                        onChangeText={props.handleChange('title')}
                        value={props.values.title}
                    />
                    <Text style={styles.inputTitle}>Opis ankiety</Text>
                    <TextInput
                       style={styles.description} 
                       multiline={true}
                       maxLength={400}
                       numberOfLines={4}
                       placeholder='Opisz ankietę, podaj czego ma dotyczyć i napisz jaki jest jej cel, (opcjonalnie podaj odnośniki prawne)...'
                       placeholderTextColor="#ffffff99"
                       onChangeText={props.handleChange('description')}
                       value={props.values.description}
                    />

                    <Text style={styles.inputTitle}>Opcje</Text>
                    <View style={styles.optionAdder}>
                      <TextInput
                        style={styles.optionInput}
                        placeholder="Dodaj opcję"
                        placeholderTextColor="#ffffff99"
                        onChangeText={handleOptionInput}
                        value={optionInput}
                        maxLength={30}
                      />
                      <TouchableOpacity onPress={handleAddOption} style={styles.optionAddButton}><Text style={{color: "#ffffff"}}>DODAJ</Text></TouchableOpacity>
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
                    <Text style={styles.inputTitle}>Miasto</Text>
                    <SearchableDropdown
                        onItemSelect={setCityHandler}
                        containerStyle={{ 
                          width: "100%",
                          marginBottom: 20
                        }}
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
                        resetValue={false}
                        textInputProps={
                          {
                            placeholder: selectedCity.name ? selectedCity.name : "Zacznij pisać i wybierz element z listy",
                      placeholderTextColor: selectedCity.name ? "#ffffff" : "#ffffff99",
                            underlineColorAndroid: "transparent",
                            style: {
                                padding: 12,
                                height: 46,
                                width: "100%",
                                borderRadius: 5,
                                borderRadius: 10,
                                color: "white",
                                backgroundColor: "#ffffff5e",
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

                    

                    <Text style={styles.inputTitle}>Zasięg ankiety</Text>
                    <SearchableDropdown
                        onItemSelect={handleRegionChange}
                        containerStyle={{ width: "100%", marginBottom: 20 }}
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
                        resetValue={false}
                        textInputProps={
                          {
                            placeholder: region.name ? region.name : "Wybierz zasięg ankiety",
                            placeholderTextColor: region.name ? "#ffffff" : "#ffffff99",
                            underlineColorAndroid: "transparent",
                            style: {
                                padding: 12,
                                height: 46,
                                width: "100%",
                                borderRadius: 5,
                                borderRadius: 10,
                                color: "white",
                                backgroundColor: "#ffffff5e",
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

<Text style={styles.inputTitle}>Tagi</Text>
                    <SearchableDropdown
                      multi={true}
                      selectedItems={tags}
                      onItemSelect={(item) => {
                        const items = tags;
                        items.push(item)
                        setTags(items);
                      }}
                      containerStyle={{ width: "100%", marginBottom: 20 }}
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
                      } }
                      itemTextStyle={{ color: '#222' }}
                      itemsContainerStyle={{ maxHeight: 140 }}
                      items={tagList}
                      chip={true}
                      resetValue={false}
                      textInputProps={
                        {
                          placeholder: "Wybierz tagi, które pasują do tej ankiety",
                            placeholderTextColor: "#ffffff99",
                            underlineColorAndroid: "transparent",
                            style: {
                                padding: 12,
                                height: 46,
                                width: "100%",
                                borderRadius: 5,
                                borderRadius: 10,
                                color: "white",
                                backgroundColor: "#ffffff5e",
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
                    <TouchableOpacity onPress={() => setIsSelected(s => !s)} style={styles.checkboxContainer}>
                      <View
                        
                        style={isSelected ? styles.checkboxSelected : styles.checkboxUnselected}
                        
                      />
                      <Text style={styles.checkboxText}>Statystyki dostępne dla wszystkich</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={() => sendPoll(props.values.title, props.values.description)}
                    >
                      <Text style={styles.submitButtonText}>
                        STWÓRZ ANKIETĘ
                      </Text>
                    </TouchableOpacity>
                </View>
            )}

            </Formik>
            </View>
          </ScrollView>
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
    cardContainer: {
      minHeight: "100%",
      width: "100%",
      backgroundColor: "#00094a",
      borderRadius: 20,
      overflow: "hidden"
    },
    formHeader: {
      height: 100,
      width: '100%',
      backgroundColor: "#001f7c",
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
    },
    inputTitle: {
      width: '100%',
      color: '#ffffff',
    },

    formHeaderText: {
      color: "#ffffff",
      fontSize: 30,
      fontWeight: "bold",
      textAlign: "center"
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
      width: "100%",
      padding: 20,
      alignItems: 'center'
    },
    input: {
      backgroundColor: '#ffffff5e',
      color: '#ffffff',
      width: '100%',
      height: 46,
      borderRadius: 10,
      paddingLeft: 10,
      marginBottom: 20
    },
    optionAdder: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: "space-between",
      height: 46,
      width: '100%',
      marginBottom: 15,
    },
    optionInput: {
      backgroundColor: '#ffffff5e',
      color: '#ffffff',
      width: '79%',
      height: 46,
      borderRadius: 10,
      paddingLeft: 10,
    },
    optionAddButton: {
      height: 46,
      width: '19%',
      display: "flex",
      backgroundColor: "#0073ff",
      justifyContent: "center",
      alignItems: "center",
      textAlignVertical: "center",
      textAlign: "center",
      borderRadius: 10,
    },
    optionList: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 7,
      width: "100%",
      height: 230,
      backgroundColor: '#ffffff26',
      borderRadius: 10,
      marginBottom: 20
    },
    optionBox: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      overflow: 'hidden',
      alignItems: 'center',
      borderRadius: 10,
      width: `95%`,
      backgroundColor: '#ffffff4d',
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
      backgroundColor: '#ffffff5e',
      color: '#ffffff',
      width: '100%',
      maxWidth: '100%',
      minHeight: 46,
      borderRadius: 10,
      padding: 10,
      marginBottom: 20,
      textAlignVertical: "top"
    },
    checkboxSelected: {
      width: 20,
      height: 20,
      backgroundColor: "#00d0ff",
      marginRight: 10,
      borderRadius: 5
    },
    checkboxUnselected: {
      width: 20,
      height: 20,
      backgroundColor: "#ffffff34",
      marginRight: 10,
      borderRadius: 5
    },
    checkboxContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginBottom: 20
    },
    checkboxText: {
      color: '#ffffff'
    },
    submitButton: {
      height: 46,
      width: "100%",
      isplay: "flex",
      backgroundColor: "#0073ff",
      justifyContent: "center",
      alignItems: "center",
      textAlignVertical: "center",
      textAlign: "center",
      borderRadius: 10,
    },
    submitButtonText: {
      color: "white",
      fontWeight: "bold"
    },
  });
