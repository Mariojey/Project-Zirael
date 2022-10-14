import { React } from "react";

import { StyleSheet, Text, View} from 'react-native';

import GlobalVariables from '../../modules/GlobalVariables';

export default function Poll(props){
    const data = props.data;


    return (
        <View style={styles.mainContainer}>
            <View style={styles.heading}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{data.title}</Text>
                    <View style={styles.user}>
                        <View style={styles.userLogo}>
                            <Text>U</Text>
                        </View>
                        <Text style={styles.userName}>Username</Text>
                    </View>
                </View>
                <View style={styles.description}>
                    <Text style={styles.descriptionText}>{data.description}</Text>
                </View>
            </View>
            <View style={styles.options}>
                {
                    data.options.map((option, index) => {
                        return(
                            <View 
                                key={index} 
                                onPress={()=>console.log(option.id)} 
                                style={styles.option}>
                                <Text style={styles.optionText}>{option.name}</Text>
                            </View>
                        )
                    })
                }
            </View>

            <View style={styles.footer}>
                <Text style={styles.tagsText}>Tags:</Text>
                <View style={styles.tags}>
                    {
                        data.tags.map((tag, index) => {
                            return (
                                <Text key={index} style={styles.tagText}>{tag}</Text> 
                            )
                        })
                    } 
                </View>
                <Text style={styles.statistic}>
                    Statistic not implemented jet
                </Text>
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
        flexDirection: 'column',
        alignItems: 'center',
        width:'90%',
        borderRadius: 20,
        padding: 12,
        backgroundColor: '#00094a',
    },
    heading: {
        width: '95%',
        flex: 0,
        flexDirection: 'column',
        minHeight: 120
    },

    title: {
        flex: 0,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems:'center',
        height: 48
    },
    titleText: {
        fontSize: 25,
        color: "#fff",
        fontWeight: 'bold'
    },
    user: {
        flex: 0,
        width: '30%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-end",
        gap: 12
    },
    userLogo: {
        flex: 0,
        height: 30,
        width: 30,
        borderRadius: 18,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3bf538'
    },
    userName: {
        color: "#fff",
    },
    description: {
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minHeight: 80,
        marginBottom: 20
    },
    descriptionText: {
        color: "#fff",
    },
    options: {
        flex: 3,
        flexDirection: 'column',
        width: '100%',
    },
    option: {
        flex: 0,
        flexDirection: 'column',
        width: '95%',
        backgroundColor: '#010c5c',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    optionText: {
        color: '#fff'
    },
    footer: {
        flex: 0,
        flexDirection: 'column',
        width: '95%',
    },
    tagsText: {
        color: '#aaa',
    },
    tags: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    tagText: {
        color: '#fff',
        fontSize: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        backgroundColor: `#01072e`,
        marginRight: 12
    },
    statistic: {
        marginTop: 12,
        color: '#aaa'
    }

  });