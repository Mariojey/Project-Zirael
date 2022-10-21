import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity, ScrollView, View, TextInput, Button, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SearchableDropdown from 'react-native-searchable-dropdown';
import React from "react";
import { Formik } from "formik";
import GlobalVariables from "../modules/GlobalVariables"

export default function RegistrationScreen(){
    function register(login, password, name, age, passwordRepeat) {
      if(password !== passwordRepeat) return
      fetch(`${GlobalVariables.apiUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          login: login,
          password: password,
          name: name,
          city: selectedCity.name,
          cityid: selectedCity.id,
          gender: selectedGender,
          age: age,
        })
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        
        
        if (response.status === 'OK') {
          return 
        }
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

    function setGenderHandler(item) {
      setSelectedGender(item.id);
    }
  
    const [selected, setSelected] = React.useState("");

    const [data, setData] = React.useState([]);

    const [selectedGender, setSelectedGender] = React.useState("");
    const [selectedCity, setSelectedCity] = React.useState({});


    const genders = [
        {id:'male', name:'Mężczyzna'},
        {id:'female',name:'Kobieta'},
        {id:'other', name:'Inna'},
        {id:'hidden',name:'Wolę nie podawać'}
    ]
    return(
      <View style={styles.homeContainer}>
        <ScrollView>
          <View style={styles.cardContainer}>
            <View style={styles.formHeader}>
              <Text style={styles.formHeaderText}>
                REJESTRACJA
              </Text>
            </View>
            <Formik
          initialValues={{login: '', password: '', passwordRepeat: '', name: '', city: '', cityid: '', gender: '', age: ''}}
          onSubmit={(values) => {
            //When f  ronend should send values from form?
            console.log("nie dziala")
          }}
        >
          {(props) => (
            <View style={styles.formContainer}>
              <Text style={styles.inputTitle}>Login</Text>
              <TextInput
                style={styles.input}
                placeholder='Zdefiniuj login'
                placeholderTextColor="#ffffff99"
                onChangeText={props.handleChange('login')}
                value={props.values.login}
              />
              <Text style={styles.inputTitle}>Hasło</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder='Zdefiniuj Hasło'
                placeholderTextColor="#ffffff99"
                onChangeText={props.handleChange('password')}
                value={props.values.password}
              />
              <Text style={styles.inputTitle}>Powtórz hasło</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder='Powtórz Hasło'
                placeholderTextColor="#ffffff99"
                onChangeText={props.handleChange('passwordRepeat')}
                value={props.values.passwordRepeat}
              />
              <Text style={styles.inputTitle}>Nazwa użytkownika (wyświetlana)</Text>
              <TextInput
                style={styles.input}
                placeholder='Zdefiniuj nazwę użytkownika'
                maxLength={20}
                placeholderTextColor="#ffffff99"
                onChangeText={props.handleChange('name')}
                value={props.values.name}
              />
              <Text style={styles.inputTitle}>Miasto</Text>
              <SearchableDropdown
                  onItemSelect={setCityHandler}
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
                  items={data}
                  resetValue={false}
                  textInputProps={
                    {
                      placeholder: "Zacznij pisać i wybierz element z listy",
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
                      onTextChange: text => fetchCities(text)
                    }
                  }
                  listProps={
                    {
                      nestedScrollEnabled: true,
                    }
                  }
              />
              <Text style={styles.inputTitle}>Płeć</Text>
              <SearchableDropdown
                  onItemSelect={setGenderHandler}
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
                  items={genders}
                  resetValue={false}
                  textInputProps={
                    {
                      placeholder: "Wybierz płeć z listy",
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
              <Text style={styles.inputTitle}>Wiek</Text>
              <TextInput
                style={styles.input}
                placeholder='Podaj swój wiek'
                keyboardType='numeric'
                maxLength={3}
                placeholderTextColor="#ffffff99"
                onChangeText={props.handleChange('age')}
                value={props.values.age}
              />
              <Text style={styles.inputTitle}></Text>
              <TouchableOpacity onPress={() => register(props.values.login, props.values.password, props.values.name, props.values.age, props.values.passwordRepeat)} style={styles.submitButton}><Text style={{color: "white"}}>Zarejestruj się</Text></TouchableOpacity>
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
      minWidth: "100%",
      maxWidth: "100%",
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
      display: 'flex',
      width: "100%",
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
