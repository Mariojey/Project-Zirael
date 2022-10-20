import  React  from "react";
import  { useState }  from "react";

import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import GlobalVariables from '../../modules/GlobalVariables';
import { getTokenData } from "../../modules/Tokens";

import trashIcon from "../../assets/trash-icon.png"
import statsIcon from "../../assets/stats-icon.png"

import PollStats from "./PollStats";
import PopupModal from "./PopupModal";

export default function Poll(props){
    const data = props.data;

    const [deleted, setDeleted] = useState(false)
    const [loading, setLoading] = useState({user: false, uservote: false, votecount: false});
    const [optionSelected, setOptionSelected] = useState(-1);
    const [voteStats, setVoteStats] = useState({});
    const [popupStats, setPopupStats] = useState(false);
    const [modalPopup, setModalPopup] = useState(false);


    const [author, setAuthor] = React.useState({
        name: "User",
        profileColor: "#3bf538"
    });
    

    React.useEffect(() => {
        getTokenData()
        .then(tokenData => {

            fetch(`${GlobalVariables.apiUrl}/user/byid`, {
                method: 'POST',
                headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                 user: tokenData.user,
                 token: tokenData.token,
                 id: data.author
                }) 
             })
             .then((response) => response.json())
             .then((response) => {
                 
                 if(response.status === 'OK'){
                    
                    setAuthor({
                        name: response.name,
                        profileColor: response.profileColor
                    })

                 }
                 setLoading(prevState => ({...prevState, user: true}))
             })

            fetch(`${GlobalVariables.apiUrl}/votes/getuservote`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: tokenData.user, 
                    token: tokenData.token,
                    pollid: data._id
                })
            })
            .then(response => response.json())
            .then(res => {
                if(res.status === "OK") {
                    
                    setOptionSelected(res.optionid)
                }
                setLoading(prevState => ({...prevState, uservote: true}))
            })

            fetch(`${GlobalVariables.apiUrl}/votes/votecount`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: tokenData.user, 
                    token: tokenData.token,
                    pollid: data._id
                })
            })
            .then(response => response.json())
            .then(res => {
                if(res.status === "OK") {
                    setVoteStats(res.statistics)
                }
                setLoading(prevState => ({...prevState, votecount: true}))
            })
        })
    }, [])  
    
    
    function unvote() {
      getTokenData()
      .then((tokenData) => {
        fetch(`${GlobalVariables.apiUrl}/votes/unvote`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: tokenData.user, 
                token: tokenData.token,
                pollid: data._id,
            })
        })
        .then(response => response.json())
        .then(res => {
            if(res.status === "OK") {
                setVoteStats(prevState => {
                    var temp = prevState;
                    if(temp.byOption === undefined) {
                        setOptionSelected(-1)
                        return temp
                    }
                    
                    if(optionSelected !== -1) {
                        temp.byOption[optionSelected] -= 1
                        temp.total -=1
                    }
                    setOptionSelected(-1)

                    return temp
                })   
            }
        })
    })
    }

    function vote(id) {
      if(id === optionSelected) {
        unvote()
        return;
      }

      getTokenData()
      .then((tokenData) => {
        fetch(`${GlobalVariables.apiUrl}/votes/vote`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: tokenData.user, 
                token: tokenData.token,
                pollid: data._id,
                optionid: id
            })
        })
        .then(response => response.json())
        .then(res => {
            if(res.status === "OK") {
                setVoteStats(prevState => {
                    var temp = prevState;
                    if(temp.total === undefined) {
                        setOptionSelected(id)
                        return temp
                    }
                    
                    if(optionSelected !== -1) {
                        temp.byOption[optionSelected] -= 1
                        temp.total -=1
                    }
                    temp.byOption[id] += 1
                    temp.total +=1

                    setOptionSelected(id)

                    return temp
                })   
            }
        })
      })
    }

    function deletePoll() {
        getTokenData().then(tokenData => {
        fetch(`${GlobalVariables.apiUrl}/polls/delete`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: tokenData.user, 
                token: tokenData.token,
                pollid: data._id,
            })
        })
        .then(response => response.json())
        .then(res => {
            if(res.status === "OK") {
                setDeleted(true)
            }
        })  
        setModalPopup(false)
    })
    }
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

    function handlePopup() {
        setPopupStats(p => !p)
    }
    function handleModal() {
        setModalPopup(p => !p)
    }

    if(deleted) {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.centerTitle}>
                    <Text style={styles.centerTitleText}>USUNIĘTO</Text>
                </View>
            </View>
        )
    }

    if(loading.user && loading.uservote && loading.votecount)
    {
        return (
            <>
            {popupStats && <PollStats pollid={data._id} title={data.title} options={data.options} closePopup={handlePopup} />}
            {modalPopup && <PopupModal close={handleModal} accept={deletePoll} />}
            <View style={styles.mainContainer}>
                <View style={styles.heading}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>{data.title}</Text>
                        <View style={styles.topBar}>
                            <View style={styles.user}>
                                <View style={[styles.userLogo, {
                                    backgroundColor: props.accountData.profileColor
                                }]}>
                                    <Text style={{
                                        fontWeight: "bold",
                                        color: invertColor(props.accountData.profileColor)
                                    }}>{author.name[0].toUpperCase()}</Text>
                                </View>
                                <Text style={styles.userName}>{author.name}</Text>
                            </View>
                            <View style={styles.controlButtons}>
                                {voteStats.total !== undefined && (
                                <TouchableOpacity onPress={() => setPopupStats(p => !p)} style={styles.controlButton}>
                                    <Image source={statsIcon} style={styles.controlButtonImage}></Image>
                                </TouchableOpacity>)}
                                {props.accountData !== null && (data.author === props.accountData.id || props.accountData.isAdmin) && (
                                <TouchableOpacity onPress={handleModal} style={styles.controlButton}>
                                    <Image source={trashIcon} style={styles.controlButtonImage}></Image>
                                </TouchableOpacity>)}
                            </View>
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
                                <TouchableOpacity
                                    key={index} 
                                    onPress={()=>vote(index)} 
                                    style={
                                        
                                        optionSelected === index ? styles.optionSelected : styles.option

                                    }>
                                        {voteStats.total !== undefined && optionSelected !== -1 ? (
                                    <>
                                        <View style={[styles.progressBar, {
                                            width: `${Math.floor(100*voteStats.byOption[option.id]/voteStats.total)}%`
                                        }]} />
                                        <View style={styles.optionLabel}>
                                            <Text style={styles.optionText}>{option.name}</Text>
                                            <Text style={styles.optionText}>{Math.floor(100*voteStats.byOption[option.id]/voteStats.total)}%</Text>
                                        </View>
                                    </>
                                        
                                    ) : (
                                        <Text style={styles.optionText}>{option.name}</Text>
                                    )}
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
    
                <View style={styles.footer}>
                    {voteStats.total !== undefined && (
                        <Text style={styles.statistic}>
                            Głosów: {voteStats.total}
                        </Text>
                    )}
                    <Text style={styles.tagsText}>Tagi:</Text>
                    <View style={styles.tags}>
                        {
                            data.tags.map((tag, index) => {
                                return (
                                    <Text key={index} style={styles.tagText}>{tag}</Text> 
                                )
                            })
                        } 
                    </View>
                    {voteStats.total === undefined && (
                        <Text style={styles.statistic}>
                            Statistyki niedostępne
                        </Text>
                    )}
                    
                </View>
            </View>
            </>
        )
    }
    else {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.centerTitle}>
                    <Text style={styles.centerTitleText}>ŁADOWANIE</Text>
                </View>
            </View>
        )
    }
    
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
    centerTitle: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
    },
    centerTitleText: {
        color: "white",
        fontSize: 25,
        width: "100%",
        textAlign: "center",
        fontWeight: "bold"
    },
    heading: {
        width: '95%',
        flex: 0,
        flexDirection: 'column',
        minHeight: 120
    },

    title: {
        flex: 0,
        flexDirection: 'column-reverse',
        width: '100%',
        justifyContent: 'space-between',
        alignItems:'flex-start',
        minHeight: 48
    },
    titleText: {
        fontSize: 25,
        color: "#fff",
        fontWeight: 'bold'
    },
    topBar: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    controlButtons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    controlButton: {
        display: "flex",
        width: 32,
        height: 32,
        borderRadius: 5,
        padding: 4,
        marginLeft: 10,
        backgroundColor: "#ffff4b",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center"
    },
    controlButtonImage: {
        width: 24,
        height: 24
    },
    user: {
        flex: 0,
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-start",
        marginBottom: 10
    },
    userLogo: {
        flex: 0,
        height: 30,
        width: 30,
        borderRadius: 18,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3bf538',
        marginRight: 15,
    },
    userName: {
        flex: 0,
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
        height: 42,
        borderRadius: 10,
        marginBottom: 10,
    },
    optionSelected: {
        flex: 0,
        flexDirection: 'column',
        width: '95%',
        height: 42,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#1600a8',
    },
    optionText: {
        padding: 10,
        color: '#fff'
    },
    optionLabel: {
        flex: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    footer: {
        flex: 0,
        flexDirection: 'column',
        width: '95%',
    },
    progressBar: {
        position: 'absolute',
        height: 42,
        borderRadius: 10,
        backgroundColor: "#ffff33",
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