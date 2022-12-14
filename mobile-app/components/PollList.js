import React from "react";
import Poll from './reusables/Poll'

import { StyleSheet, Text, View, Image} from 'react-native';
import Swiper from 'react-native-swiper';

import GlobalVariables from '../modules/GlobalVariables';
import { getTokenData } from "../modules/Tokens";

export default function PollList(){
  const [polls, setPolls] = React.useState([]);
  const [accountData, setAccountData] = React.useState(null)
  
  function getPolls(){
    getTokenData().then(tokenData => {
        fetch(`${GlobalVariables.apiUrl}/polls/list`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            user: tokenData.user,
            token: tokenData.token
          })
        })
        .then(response => response.json())
        .then(res => {
          if(res.status === "OK") {
            setPolls(res.polls)
          }
        })

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
    
  }

  React.useEffect(()=> {
    getPolls();
  }, [])
  
  return (
     <Swiper 
        showsPagination={false} 
        showsButtons={false}
        loop={false}
        index={0}
      >
      {polls.map((pollData, index) => {
          return(
            <View key={index} style={styles.container}>
              <Poll accountData={accountData} data={pollData} />
            </View>
          )
      })}
     </Swiper>
    )
}
/*|
<View style={styles.container}>
      <CardsSwipe
        cards={cardsData}
        onSwipeStart={() => //console.log("SWIPE")}
        cardContainerStyle={styles.cardContainer}
        renderCard={(card) => card.src}
      />
    </View>*/
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      paddingBottom: 10
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
      shadowColor: '#000',
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