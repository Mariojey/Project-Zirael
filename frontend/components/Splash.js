import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Lottie from 'lottie-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {storeToken, storeUser, verifyToken} from '../modules/Tokens';


function Splash(props){
  return (
    <View style={styles.container}>
      <Lottie source={require('../assets/splash.json')} 
        autoPlay 
        loop={false} 
        speed={0.5}
        onAnimationFinish = {()=>{
          //console.log('Animation Finished');
          

          verifyToken().then((value) => {
            console.log(value)
            if (value) {
              props.logHandler(true)
            }
            else {
              props.logHandler(false)
            }
            props.loadingHandler(false)
          })

        }} />
        <StatusBar style="auto" />
    </View>
  );
}

/*
export default class Splash extends React.Component {
    constructor(props){
        super();
    }

    render(){
        return(
            <View style={styles.container}>
                <Lottie source={require('../assets/splash.json')} autoPlay loop />
                <StatusBar style="auto" />
            </View>
        )
    }
}
*/
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
    }
  });

  export default Splash

