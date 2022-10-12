import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SelectList } from "react-native-dropdown-select-list"
import React from "react";

export default function RegistrationScreen(){
    function register(login, password, name, city, cityid, gender, age) {
      console.log("submit?")
      fetch('http://192.168.100.12:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          login: login,
          password: password,
          name: name,
          city: city,
          cityid: cityid,
          gander: gender,
          age: age,
        })
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        
        
        if (response.status === 'OK') {
            console.log('Prawie kurwa sukces!');
        }
      })
      
    }
  
    const [selected, setSelected] = React.useState("");

    const data = [
        {cityid:'0', city:'Mielec'},
        {cityid:'1', city:'Tarnobrzeg'},
        {cityid:'2', city:'Dębica'},
        {cityid:'3', city:'Stalowa Wola'},
        {cityid:'4', city:'Przeworsk kurwa'},
        {cityid:'5', city:'Rzeszów'},
        {cityid:'6', city:'Jasło'},
        {cityid:'7', city:'Krosno'},
        {cityid:'8', city:'Kolbuszowa'},
        {cityid:'9',city:'Radomyśl Wielki'},
        {cityid:'10',city:'Sokołów Małopolski'},
        {cityid:'11',city:'Ropczyce'},
        {cityid:'12',city:'Sanok'},
    ]

    const [selectedGender, setSelectedGender] = React.useState("");

    const genders = [
        {genId:'male',genderName:'mężczyzna'},
        {genId:'female',genderName:'kobieta'},
        {genId:'other',genderName:'osoba niebinarna'},
        {genId:'hidden',genderName:'wolę nie podawać'},
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
              <SelectList
                 data={data}
                 setSelected={setSelected}
                 placeholder="Wpisz swoje miejsce zamiekszania..."
                 />
              <SelectList
                 data={genders}
                 setSelected={setSelectedGender}
                 placeholder="Wybierz swoją płeć"
                 />          
              <TextInput
                style={styles.input}
                placeholder='Podaj swój wiek'
                onChangeText={props.handleChange('age')}
                value={props.values.age}
              />
              <Button onPress={() => register(props.values.login, props.values.password, props.value.name, selected.city, selected.cityid, selectedGender.genId, props.value.age)} title='submit' style={styles.button}>Zaloguj się!</Button>
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