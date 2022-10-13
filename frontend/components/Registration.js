import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SearchableDropdown from 'react-native-searchable-dropdown';
import React from "react";
import { Formik } from "formik";
import GlobalVariables from "../modules/GlobalVariables"

export default function RegistrationScreen(){
    function register(login, password, name, age) {
      console.log("submit?")
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
        {id:'male', name:'mężczyzna'},
        {id:'female',name:'kobieta'},
        {id:'other', name:'osoba niebinarna'},
        {id:'hidden',name:'wolę nie podawać'}
    ]
    return(
      <View style={styles.homeContainer}>
        <Text style={styles.homeText}>Login!</Text>
        <Formik
          initialValues={{login: '', password: '', name: '', city: '', cityid: '', gender: '', age: ''}}
          onSubmit={(values) => {
            //When f  ronend should send values from form?
            console.log("nie dziala")
          }}
        >
          {(props) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder='Podaj swój login...'
                onChangeText={props.handleChange('login')}
                value={props.values.login}
              />
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder='Podaj hasło...'
                onChangeText={props.handleChange('password')}
                value={props.values.password}
              />
              <TextInput
                style={styles.input}
                placeholder='Wpisz nazwę użytkownika...'
                onChangeText={props.handleChange('name')}
                value={props.values.name}
              />
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
                  onItemSelect={setGenderHandler}
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
                  items={genders}
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
              <TextInput
                style={styles.input}
                placeholder='Podaj swój wiek'
                onChangeText={props.handleChange('age')}
                value={props.values.age}
              />
              <Button onPress={() => register(props.values.login, props.values.password, props.values.name, props.values.age)} title='submit' style={styles.button}>Zaloguj się!</Button>
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
    input: {
      backgroundColor: '#fff',
      color: '#000'
    },
  });