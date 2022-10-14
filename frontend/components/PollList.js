import { React } from "react";
import Poll from './reusables/Poll'

import { StyleSheet, Text, View, Image} from 'react-native';
import CardsSwipe from 'react-native-cards-swipe';

import GlobalVariables from '../modules/GlobalVariables';

export default function PollList(){
  function getPolls(){
    fetch(`${GlobalVariables.apiUrl}/polls/listall`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        
      })
    })
  }
  
  const cardsData = [
    // { src: require('../assets/Madej_w_swzkol.png') },
    // { src: require('../assets/c3xfc0va8vt21.jpg') },
    { src: <Poll /> },
    { src: <Poll /> },
  ];
  
  return (
    <View style={styles.container}>
      <CardsSwipe
        cards={cardsData}
        onSwipeStart={() => console.log("SWIPE")}
        cardContainerStyle={styles.cardContainer}
        renderCard={(card) => card.src}
      />
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
    cardContainer: {
      width: '92%',
      height: '70%',
    },
    card: {
      width: '100%',
      height: '100%',
      shadowColor: '#000000',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.07,
      shadowRadius: 3.3,
    },
    cardImg: {
      width: '100%',
      height: '100%',
      borderRadius: 13,
    },
  });