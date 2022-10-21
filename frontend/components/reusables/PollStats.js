import  React  from "react";
import  { useState }  from "react";

import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { StackedBarChart, XAxis, YAxis, Grid} from 'react-native-svg-charts'

import SelectDropdown from 'react-native-select-dropdown'

import GlobalVariables from '../../modules/GlobalVariables';
import { getTokenData } from "../../modules/Tokens";

import trashIcon from "../../assets/cross.png"

export default function PollStats(props){

    const [isLoading, setIsLoading] = useState(true)
    const [fetchData, setFetchData] = useState({})
    const [dataSource, setDataSource] = useState([{
        age: '0',
        male: 0,
        female: 0,
        other: 0,
        hidden: 0,
    }])

    const colors = ['#0077ff', '#a55194', '#00ff6e', '#e5ff00']
    const keys = ['male', 'female', 'other', 'hidden']

    const xaxislen = dataSource.map(object => {
        return (object.male + object.female + object.other + object.hidden)
    }).sort((a,b) => (a-b) * -1)[0]

    const xaxis = [...Array(xaxislen+1).keys()]


    function setOptionHandler(option) {
        const value = option-1;
        if(value === -1) {
            setDataSource(fetchData.total.chartdata)
            return
        }
        setDataSource(fetchData.byOption[value].chartdata)
    }

    const options = [
        {id:'all', name:'Ogółem'},
        ...props.options
    ].map(o => o.name)

    React.useEffect(() => {
        try {
        getTokenData()
        .then(tokenData => {

            try{
                fetch(`${GlobalVariables.apiUrl}/votes/fullstats`, {
                    method: 'POST',
                    headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        user: tokenData.user,
                        token: tokenData.token,
                        pollid: props.pollid
                    }) 
                 })
                 .then((response) => response.json())
                 .then((response) => {
                     
                     if(response.status === 'OK'){
                        setFetchData(response.statistics)
                        setDataSource(response.statistics.total.chartdata)
                        setIsLoading(false)
                    }
                    else {
                        props.closePopup()
                    }
                })
            }
            catch {
                props.closePopup()
            }
        })}
        catch {
            props.closePopup()
        }
    }, [])  



    if(isLoading) {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.heading}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>{props.title}</Text>
                        <View style={styles.topBar}>
                            <View style={styles.user}>
                                <View style={styles.userLogo}>
                                </View>
                                <Text style={styles.userName}>STATYSTYKI</Text>
                            </View>
                            <View style={styles.controlButtons}>
                                <TouchableOpacity onPress={props.closePopup} style={styles.controlButton}>
                                    <Image source={trashIcon} style={styles.controlButtonImage}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.description}>
                        <Text style={styles.descriptionText}>WCZYTYWANIE</Text>
                    </View>
                </View>
            </View>
        )
    }
    else {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.heading}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>{props.title}</Text>
                        <View style={styles.topBar}>
                            <View style={styles.user}>
                                <View style={styles.userLogo}>
                                </View>
                                <Text style={styles.userName}>STATYSTYKI</Text>
                            </View>
                            <View style={styles.controlButtons}>
                                <TouchableOpacity onPress={props.closePopup} style={styles.controlButton}>
                                    <Image source={trashIcon} style={styles.controlButtonImage}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.description}>
                    <SelectDropdown
                        data={options}
                        defaultValueByIndex={0}
                        onSelect={(selectedItem, index) => {
                            setOptionHandler(index)
                        }}

                        buttonStyle={{
                            width: '100%',
                            marginTop: 15,
                            borderRadius: 10,
                            height: 36,
                            backgroundColor: "#ffff60"
                        }}
                        buttonTextStyle={{
                            width: '100%',
                            color: '#ffffff'
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                    />
                    </View>
                </View>
                <View style={styles.options}>
                    
                    <YAxis
                        style={{zIndex: 20,position: "absolute", height: '100%'}}
                        data={[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]}
                        contentInset={{ top: 10, bottom: 10 }}
                        svg={{
                            fill: 'white',
                            fontSize: 10,
                        }}
                        numberOfTicks={20}
                        formatLabel={(v) => `${v*5} - ${(v*5)+4}`}
                    />
                    
                    <StackedBarChart
                        style={{height: '100%'}}
                        keys={keys}
                        horizontal={true}
                        colors={colors}
                        data={dataSource.reverse()}
                        contentInset={{ left: 40, right: 10}}
                        showGrid={false}
                    >   
                        <Grid svg={{fill: 'white' }} direction={Grid.Direction.VERTICAL}></Grid>
                    </StackedBarChart>
                    <XAxis
                        style={{ marginLeft: 40 }}
                        data={xaxis}
                        formatLabel={(value, index) => index}
                        contentInset={{ left: 10, right: 10 }}
                        svg={{ fontSize: 10, fill: 'white' }}
                    />
                    <View style={styles.legend}>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendIcon, {backgroundColor: colors[0]}]}></View>
                            <Text style={styles.legendText}>Mężczyźni</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendIcon, {backgroundColor: colors[1]}]}></View>
                            <Text style={styles.legendText}>Kobiety</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendIcon, {backgroundColor: colors[2]}]}></View>
                            <Text style={styles.legendText}>Inni</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendIcon, {backgroundColor: colors[3]}]}></View>
                            <Text style={styles.legendText}>Nieokreślone</Text>
                        </View>
                    </View>
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
        fontSize: 18,
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
        backgroundColor: "#ffffff4b",
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
        display: "flex",
        flexDirection: 'column',
        flex: 3,
        marginBottom: 30,
        width: '100%',
        height: '60%'
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
    legend: {
        position: "absolute",
        bottom: -30,
        width: '100%',
        height: 20,
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    legendItem: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center"

    },  
    legendIcon: {
        width: 10,
        height: 10,
        backgroundColor: "#f00",
        marginRight: 5,
    },
    legendText: {
        color: "#ffffffff",
        fontSize: 10
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
        backgroundColor: "#ffffff33",
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