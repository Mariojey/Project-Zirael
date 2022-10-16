import React from "react";

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Form, Input, TextInput, Button } from 'react-native';

import {getTokenData} from '../modules/Tokens';
import GlobalVariables from "../modules/GlobalVariables";

export default function Account(){

    
const [userData, setUserData] = React.useState(null)

    React.useEffect(() => {
        getTokenData()
        .then(tokenData => {

            fetch(`${GlobalVariables.apiUrl}/user/profiledata`, {
                method: 'POST',
                headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                 user: tokenData.user,
                 token: tokenData.token,
                }) 
             })
             .then((response) => response.json())
             .then((response) => {
                 
                 if(response.status === 'OK'){
                    
                     setUserData(response.accountData)

                 }
                 else {
                    setUserData({name: "NIE DZIAŁA"})
                 }
             })
        })
    }, [])    

    return(
        <View style={styles.container}>
            <Text style={styles.containerText}>Moje Konto</Text>
            <View style={styles.user}>
                <View style={styles.userLogo}>
                    <Text>U</Text>
                    <Text style={styles.userName}>{userData !== null && userData.name}</Text>
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 0,
      backgroundColor: '#000',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
    containerText: {
      color: '#fff',
      fontSize: 30,
      marginBottom: 30,
    },
    user: {
        flex: 1,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        gap: 12
    },
    userLogo: {
        flex: 1,
        height: 60,
        width: 60,
        borderRadius: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3bf538'
    },
    userName: {
        flex: 1,
        color: "#fff",
    },
  });