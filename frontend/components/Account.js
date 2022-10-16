import React from "react";

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Form, Input, TextInput, Button } from 'react-native';

export default function Account(){
    <View style={styles.container}>
        <Text style={styles.containerText}>Moje Konto</Text>
        <View style={styles.user}>
            <View style={styles.userLogo}>
                <Text>U</Text>
            </View>
            <Text style={styles.userName}>UserName</Text>
        </View>
    </View>
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
    },
    user: {
        flex: 1,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-end",
        gap: 12
    },
    userLogo: {
        flex: 1,
        height: 60,
        width: 60,
        borderRadius: 18,
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