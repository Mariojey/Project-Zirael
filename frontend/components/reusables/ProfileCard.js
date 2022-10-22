import  React  from "react";
import  { useState }  from "react";

import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import GlobalVariables from '../../modules/GlobalVariables';
import { getTokenData } from "../../modules/Tokens";

import trashIcon from "../../assets/cross.png"

export default function ProfileCard(props){

    const [accountData, setAccountData] = useState(null)

    function invertColor(hex) {
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            throw new Error('Invalid HEX color.');
        }
        // invert color components
        var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
            g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
            b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
        // pad each with zeros and return
        return '#' + padZero(r) + padZero(g) + padZero(b);
    }
    
    function padZero(str, len) {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }

    React.useEffect(() => {
        getTokenData().then(tokenData => {
            fetch(`${GlobalVariables.apiUrl}/user/profiledata`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: tokenData.user, 
                    token: tokenData.token,
                })
            })
            .then(response => response.json())
            .then(res => {
                if(res.status === "OK") {
                    setAccountData(res.accountData);
                }
            })
        })
    }, [])
    
    function genderName(gender) {
        if(gender === "male") return "Mężczyzna"
        if(gender === "female") return "Kobieta"
        if(gender === "other") return "Inna"
        if(gender === "hidden") return "Nieznana"
        return "-"
    }

    if(accountData === null) {
        return (
            <View style={styles.mainContainer}></View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <View style={[styles.banner, {
                backgroundColor: invertColor(accountData.profileColor),
            }]}>
                <View style={[styles.logo, {
                    backgroundColor: accountData.profileColor,
                }]}>
                    <Text style={[styles.logoText, {
                        color: invertColor(accountData.profileColor),

                    }]}>{accountData !== null ? accountData.name[0].toUpperCase() : "-"}</Text>
                </View>
                <Text style={styles.username}>{accountData !== null ? accountData.name : "-"}</Text>
            </View>
            <Text style={styles.separatorText}>INFORMACJE O KONCIE</Text>
            <View style={styles.separator}></View>
            <Text style={styles.statsText}>Płeć: <Text style={styles.inline}>{accountData !== null ? genderName(accountData.gender) : "-"}</Text></Text>
            <Text style={styles.statsText}>Wiek: <Text style={styles.inline}>{accountData !== null ? accountData.age : "-"}</Text></Text>
            <Text style={styles.statsText}>Miasto: <Text style={styles.inline}>{accountData !== null ? accountData.city : "-"}</Text></Text>
            <Text style={styles.statsText}>Ankiety: <Text style={styles.inline}>{props.pollCount}</Text></Text>
            <Text style={styles.statsText}>Typ konta: <Text style={styles.inline}>{accountData !== null && accountData.isAdmin ? "Administrator" : "Uzytkownik"}</Text></Text>
            <Text style={styles.statsText}>Zarejestrowano: <Text style={styles.inline}>{accountData !== null ? new Date(accountData.timestamp).toLocaleDateString() : "-"}</Text></Text>
            
            {props.pollCount > 0 && <Text style={styles.footerText}>(Przesuń, by zobaczyć swoje ankiety)</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        zIndex: 10,
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        width:'90%',
        borderRadius: 20,
        backgroundColor: '#00094a',
        overflow: "hidden"
    },
    banner: {
        width: `100%`,
        height: "16%",
        backgroundColor: "#ff0000",
        marginBottom: 95
    },
    logo: {
        position: "absolute",
        backgroundColor: "#00ff00",
        width: 100,
        height: 100,
        bottom: -50,
        left: '50%',
        marginLeft: -50,
        borderWidth: 8,
        borderColor: '#00094a',
        borderRadius: 100,
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
    },
    logoText: {
        textAlign: "center",
        fontSize: 50,
        fontWeight: "bold"
    },
    username: {
        position: "absolute",
        color: "white",
        width: "100%",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "500",
        bottom: -80,
    },
    separatorText: {
        color: "#dcdcdc",
        width: "90%",
        textAlign: "left",
        fontWeight: "500",
        fontSize: 12
    },
    separator: {
        height: 1,
        width: "90%",
        backgroundColor: "#aeaeae",
        marginTop: 5,
        marginBottom: 10
    },
    statsText: {
        width: "90%",
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "left",
        fontSize: 16,
        color: "#ffffff"
    },
    inline: {
        fontWeight: "400"
    },
    footerText: {
        position: "absolute",
        bottom: 10,
        color: "#dddddd"
    }
  });