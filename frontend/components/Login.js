import React from "react";

import { StyleSheet, TouchableOpacity, Text, View, Form, Input, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { storeUser, storeToken } from '../modules/Tokens';
import GlobalVariables from '../modules/GlobalVariables';
import { Formik } from "formik";

import { Toast } from "toastify-react-native"


function LoginScreen({route, navigation}){
    function login(user, password) {

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
        
        if (response.status === 'OK') {
          const user = response.user;
          const token = response.token;

          storeUser(user);
          storeToken(token);
  
          Toast.success("Zalogowano pomyślnie")

          route.params.logHandler(true)
          return
        }
        Toast.error("Logowanie nie powiodło się")
      })
      
    }
  
  
    return(
      <View style={styles.mainContainer}>
        <View style={styles.formHeader}>
          <Text style={styles.formHeaderText}>
            LOGOWANIE
          </Text>
        </View>
        <Formik
          initialValues={{user: '', password: ''}}
          onSubmit={(values) => {
            //When f  ronend should send values from form?

          }}
        >
          {(props) => (
            <View style={styles.formContainer}>
              <Text style={styles.inputTitle}>Login</Text>
              <TextInput
                style={styles.input}
                placeholder='Podaj login'
                placeholderTextColor="#ffffff99"
                onChangeText={props.handleChange('user')}
                value={props.values.user}
              />
              <Text style={styles.inputTitle}>Hasło</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder='Podaj hasło'
                placeholderTextColor="#ffffff99"
                onChangeText={props.handleChange('password')}
                value={props.values.password}
              />
              <View style={styles.separator} />
              <TouchableOpacity onPress={() => login(props.values.user, props.values.password)} title='submit' style={styles.submitButton}><Text style={{color: "white", fontWeight:"bold"}}>Zaloguj się</Text></TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    )
  }

  export default LoginScreen;

  const styles = StyleSheet.create({
    mainContainer: {
      width: "100%",
      height: "100%",
      backgroundColor: '#00094a',
      display: 'flex',
      alignItems: 'center',
      borderRadius: 10,
      flexDirection: 'column',
      overflow: "hidden"
    },
    formContainer: {
      width: "100%",
      flex: 3,
      padding: 20
    },
    formHeader: {
      height: 100,
      width: '100%',
      backgroundColor: "#001f7c",
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
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
    separator: {
      flex: 3,
    },
    homeText: {
      color: '#fff',
      fontSize: 30,
    },
    inputTitle: {
      width: '100%',
      color: '#ffffff',
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