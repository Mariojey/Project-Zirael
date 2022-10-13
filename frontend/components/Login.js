import React from "react";

import { StyleSheet, Text, View, Form, Input, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { storeUser, storeToken } from '../modules/Tokens';
import GlobalVariables from '../modules/GlobalVariables';
import { Formik } from "formik";


function LoginScreen({route, navigation}){
    function login(user, password) {
      console.log("submit?")
      fetch(`${GlobalVariables.apiUrl}/auth/signin`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          login: user,
          password: password,
        })
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        
        
        if (response.status === 'OK') {
          const user = response.user;
          const token = response.token;
  
          console.log(user);
          console.log(token);
  
          storeUser(user);
          storeToken(token);
  
          route.params.logHandler(true)
        }
      })
      
    }
  
  
    return(
      <View style={styles.homeContainer}>
        <Text style={styles.homeText}>Login!</Text>
        <Formik
          initialValues={{user: '', password: ''}}
          onSubmit={(values) => {
            //When f  ronend should send values from form?
            console.log("nie dziala")
          }}
        >
          {(props) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder='Wpisz nazwę użytkownika...'
                onChangeText={props.handleChange('user')}
                value={props.values.user}
              />
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder='Podaj hasło...'
                onChangeText={props.handleChange('password')}
                value={props.values.password}
              />
              <Button onPress={() => login(props.values.user, props.values.password)} title='submit' style={styles.button}>Zaloguj się!</Button>
            </View>
          )}
        </Formik>
        <Button onPress={() => navigation.navigate('Registration')} title='move' style={styles.button}>Nie mam konta!</Button>
      </View>
    )
  }

  export default LoginScreen;

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