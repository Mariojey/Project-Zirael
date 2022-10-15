import React from "react";

import { StyleSheet, View, Text, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import GlobalVariables from "../modules/GlobalVariables";
import { Formik } from "formik";

export default function addPoll(){
    
        function sendPoll(token, user, title, description, tags, resultsPublic, range, city, cityid, options) {
            console.log("submit?")
            fetch(`${GlobalVariables.apiUrl}/polls/create`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                token: token,
                user: user,
                title: title,
                description: description,
                tags: tags,
                options: options,
                resultsPublic: resultsPublic,
                range: range,
                city: city,
                cityid: cityid,

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
            
          }
    return(
        <View style={styles.homeContainer}>
            <Text style={styles.homeText}>Add Poll</Text>
            <Formik
            initialValues={{token: '', user: '', title: '', description: '', tags: '', options: '', resultsPublic: '', range: '', city: '', cityid: ''}}
            onSubmit={(values) => {
                console.log("może działa");
            }}
            >{(props) => (
                <View>
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
