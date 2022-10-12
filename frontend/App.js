import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Form, Input, TextInput, Button } from 'react-native';
import Lottie from 'lottie-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AsyncStorage } from 'react-native';
import { Formik } from 'formik';

import Splash from './components/Splash';
import HomeScreen from './components/Home';
import { storeUser, storeToken } from './modules/Tokens';

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
  function login(user, password) {
    console.log("submit?")
    fetch('http://192.168.55.9:3001/auth/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        login: user,
        password: password,
      })
    })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      
      
      if (response.status === 'OK') {
        const user = response.user;
        const token = response.token;

        console.log(user);
        console.log(token);

        storeUser(user);
        storeToken(token);
      }
    })
    
  }


  return(
    <View style={styles.homeContainer}>
      <Text style={styles.homeText}>Login!</Text>
      <Formik
        initialValues={{user: '', password: ''}}
        onSubmit={(values) => {
          //When f  ronend should send values from form?
          console.log("nie dziala")
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder='Wpisz nazwę użytkownika...'
              onChangeText={props.handleChange('user')}
              value={props.values.user}
            />
            <TextInput
              style={styles.input}
              placeholder='Podaj hasło...'
              onChangeText={props.handleChange('password')}
              value={props.values.password}
            />
            <Button onPress={() => login(props.values.user, props.values.password)} title='submit' style={styles.button}>Zaloguj się!</Button>
          </View>
        )}
      </Formik>
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
  input: {
    backgroundColor: '#fff',
    color: '#000'
  },
});