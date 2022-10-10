import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Form, Input } from 'react-native';
import Lottie from 'lottie-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AsyncStorage } from 'react-native';

import Splash from './components/Splash';
import HomeScreen from './components/Home';

/*
function Splash({navigation}){
  return (
    <View style={styles.container}>
      <Lottie source={require('./assets/splash.json')} 
        autoPlay 
        loop={false} 
        speed={0.5}
        onAnimationFinish = {()=>{
          //console.log('Animation Finished');
          storeToken("razdwatrzy");

          verifyToken().then((value) => {
            if (value) {
              navigation.navigate('Home');
            }
            else {
              navigation.navigate('Login');
            }
          })
          
          //
        }} />
        <StatusBar style="auto" />
    </View>
  );
}



function HomeScreen(){
  return(
    <View style={styles.homeContainer}>
        <Text style={styles.homeText}>Hello Citizen!</Text>
    </View>
  )
}
*/
function LoginScreen(){
  return(
    <View style={styles.homeContainer}>
      <Text style={styles.homeText}>Login!</Text>
    </View>
  )
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
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
});