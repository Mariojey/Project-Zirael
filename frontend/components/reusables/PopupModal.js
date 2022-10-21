import  React  from "react";
import  { useState }  from "react";

import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { StackedBarChart, XAxis, YAxis, Grid} from 'react-native-svg-charts'

import SelectDropdown from 'react-native-select-dropdown'

import GlobalVariables from '../../modules/GlobalVariables';
import { getTokenData } from "../../modules/Tokens";

import trashIcon from "../../assets/cross.png"

export default function PopupModal(props){

    
    return (
        <View style={styles.mainContainer}>
            <View style={styles.heading}>
                <TouchableOpacity onPress={props.close} style={styles.controlButton}>
                    <Image source={trashIcon} style={styles.controlButtonImage}></Image>
                </TouchableOpacity>
            </View>

            <View style={styles.body}>
                <Text style={styles.bodyTitle}>Potwierdź operację</Text>
                <Text style={styles.bodyDesc}>Uwaga! Tej operacji nie można potem cofnąć</Text>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={props.accept} style={styles.closeButton}>
                    <Text style={styles.buttonText}>USUŃ</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.close} style={styles.cancelButton}>
                    <Text style={styles.buttonText}>ANULUJ</Text>
                </TouchableOpacity>
            </View>
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
    mainContainer: {
        flex: 1,
        position: "absolute",
        zIndex: 10,
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        width:'90%',
        borderRadius: 20,
        padding: 12,
        backgroundColor: '#00094a',
    },
    heading: {
        width: '95%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: "flex-end",
        minHeight: 80
    },
    controlButton: {
        display: "flex",
        width: 32,
        height: 32,
        borderRadius: 5,
        padding: 4,
        marginLeft: 10,
        backgroundColor: "#ffffff4b",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center"
    },
    controlButtonImage: {
        width: 24,
        height: 24
    },
    body: {
        width: '100%',
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        textAlign: "center"
    },
    bodyTitle: {
        color: "#ffffff",
        textAlign: "left",
        fontSize: 25,
        fontWeight: 'bold'
    },
    bodyDesc: {
        color: "#bbb",
        textAlign: "left",
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttons: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: "center",
        width: '100%',
    },
    closeButton: {
        flex: 0,
        flexDirection: 'column',
        width: '95%',
        backgroundColor: '#ff0000',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 42,
        borderRadius: 10,
        marginBottom: 20,
    },
    cancelButton: {
        flex: 0,
        flexDirection: 'column',
        width: '95%',
        backgroundColor: '#575757',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 42,
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 20,

    }
  });