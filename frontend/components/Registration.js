import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SearchableDropdown from 'react-native-searchable-dropdown';
import React from "react";
import { Formik } from "formik";

export default function RegistrationScreen(){
    function register(login, password, name, cityid, gender, age) {
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
          city: "",
          cityid: cityid,
          gander: gender,
          age: age,
        })
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        
        
        if (response.status === 'OK') {
        }
      })
      
    }
  
    const [selected, setSelected] = React.useState("");

    const data = [
          {
            id: "6344293cdd60cc39a22f0943",
            name: "Wartkowice, gmina wiejska"
          },
          {
            id: "6344293cdd60cc39a22f094f",
            name: "Warta, gmina miejsko-wiejska"
          },
          {
            id: "6344293cdd60cc39a22f0950",
            name: "Warta, miasto w gminie miejsko-wiejskiej"
          },
          {
            id: "6344293cdd60cc39a22f0951",
            name: "Warta, obszar wiejski"
          },
          {
            id: "6344293cdd60cc39a22f0986",
            name: "Świnice Warckie, gmina wiejska"
          },
          {
            id: "6344293cdd60cc39a22f0a55",
            name: "Warszawa, gmina miejska"
          },
          {
            id: "6344293ddd60cc39a22f0ad1",
            name: "Warka, gmina miejsko-wiejska"
          },
          {
            id: "6344293ddd60cc39a22f0ad2",
            name: "Warka, miasto w gminie miejsko-wiejskiej"
          },
          {
            id: "6344293ddd60cc39a22f0ad3",
            name: "Warka, obszar wiejski"
          },
          {
            id: "6344293ddd60cc39a22f0ad4",
            name: "Góra Kalwaria, gmina miejsko-wiejska"
          },
          {
            id: "6344293ddd60cc39a22f0ad5",
            name: "Góra Kalwaria, miasto w gminie miejsko-wiejskiej"
          },
          {
            id: "6344293ddd60cc39a22f0ad6",
            name: "Góra Kalwaria, obszar wiejski"
          },
          {
            id: "6344293ddd60cc39a22f0c0b",
            name: "Kalwaria Zebrzydowska, gmina miejsko-wiejska"
          },
          {
            id: "6344293ddd60cc39a22f0c0c",
            name: "Kalwaria Zebrzydowska, miasto w gminie miejsko-wiejskiej"
          },
          {
            id: "6344293ddd60cc39a22f0c0d",
            name: "Kalwaria Zebrzydowska, obszar wiejski"
          },
          {
            id: "6344293edd60cc39a22f0ffc",
            name: "Gowarczów, gmina wiejska"
          },
          {
            id: "6344293edd60cc39a22f1288",
            name: "Swarzędz, gmina miejsko-wiejska"
          },
          {
            id: "6344293edd60cc39a22f1289",
            name: "Swarzędz, miasto w gminie miejsko-wiejskiej"
          },
          {
            id: "6344293edd60cc39a22f128a",
            name: "Swarzędz, obszar wiejski"
          },
          {
            id: "6344293edd60cc39a22f129e",
            name: "Nowe Miasto nad Wartą, gmina wiejska"
          },
          {
            id: "6344293edd60cc39a22f130b",
            name: "Warnice, gmina wiejska"
          },
          {
            id: "6344293edd60cc39a22f137a",
            name: "Nowe Warpno, gmina miejsko-wiejska"
          },
          {
            id: "6344293edd60cc39a22f137b",
            name: "Nowe Warpno, miasto w gminie miejsko-wiejskiej"
          },
          {
            id: "6344293edd60cc39a22f137c",
            name: "Nowe Warpno, obszar wiejski"
          },
          {
            id: "6344293edd60cc39a22f139a",
            name: "Warta Bolesławiecka, gmina wiejska"
          },
          {
            id: "6344293edd60cc39a22f13a4",
            name: "Kowary, gmina miejska"
          },
          {
            id: "6344293edd60cc39a22f146e",
            name: "Twardogóra, gmina miejsko-wiejska"
          },
          {
            id: "6344293edd60cc39a22f146f",
            name: "Twardogóra, miasto w gminie miejsko-wiejskiej"
          },
          {
            id: "6344293edd60cc39a22f1470",
            name: "Twardogóra, obszar wiejski"
          },
          {
            id: "6344293edd60cc39a22f1605",
            name: "Warlubie, gmina wiejska"
          },
          {
            id: "6344293edd60cc39a22f1732",
            name: "Lidzbark Warmiński, gmina miejska"
          },
          {
            id: "6344293edd60cc39a22f1734",
            name: "Lidzbark Warmiński, gmina wiejska"
          }
    ]

    const [selectedGender, setSelectedGender] = React.useState("");


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
                  onItemSelect={(item) => {
                    console.log(item)
                  }}
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
                      onTextChange: text => console.log(text)
                    }
                  }
                  listProps={
                    {
                      nestedScrollEnabled: true,
                    }
                  }
              />
              {/* <SearchableDropdown
                onItemSelect={(item) => {
                  console.log(item)
                }}
                placeholder="Podaj Płeć"
                items={genders}
              /> */}
              <TextInput
                style={styles.input}
                placeholder='Podaj swój wiek'
                onChangeText={props.handleChange('age')}
                value={props.values.age}
              />
              <Button onPress={() => register(props.values.login, props.values.password, props.value.name, selected, selectedGender, props.value.age)} title='submit' style={styles.button}>Zaloguj się!</Button>
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