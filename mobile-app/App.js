import React from "react";

import ToastManager, { Toast } from 'toastify-react-native'
import { StyleSheet, Image, TouchableOpacity ,Text, View, Form, Input, TextInput, Button, Touchable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {DarkTheme} from '@react-navigation/native'; 

import {Ionicons} from 'react-native-vector-icons';

import Splash from './components/Splash';
import HomeScreen from './components/Home';
import RegistrationScreen from './components/Registration';
import Login from './components/Login'
import PollList from './components/PollList'
import CreatePoll from './components/CreatePoll'
import Account from "./components/Account";

import logo from "./assets/logo.png"
import logoutIcon from "./assets/log-out.png"

import { storeUser, storeToken, clearData } from './modules/Tokens';
import GlobalVariables from './modules/GlobalVariables';

export default function App() {
  const Stack = createBottomTabNavigator();

  const [isLoading, setIsLoading] = React.useState(true);
  const [isLogged, setIsLogged] = React.useState(false);

  function setLoggedHandler(state) {
      setIsLogged(state);
  }

  function setLoadingHandler(state) {
    setIsLoading(state);
  }

  function logOut() {
    clearData();
    setLoggedHandler(false);
  }

  if(isLoading) {
    return (
      <Splash 
        loadingHandler={setLoadingHandler}
        logHandler={setLoggedHandler}
      />
    )
  }
  else {
    return (
      <NavigationContainer theme={DarkTheme}>
        
        <Stack.Navigator
         headerMode={'none'}
         screenOptions={({route}) => ({
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            if (route.name === 'Główna') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === "Ankiety"){
              iconName = focused ? 'podium':'podium-outline';
            } else if (route.name === 'Login'){
              iconName = focused ? 'ios-arrow-redo-circle-sharp':'ios-arrow-redo-circle-outline';
            } else if (route.name === 'Registration'){
              iconName = focused ? 'ios-person-add':'ios-person-add-outline';
            } else if(route.name === 'Dodaj'){
              iconName = focused ? 'ios-add-circle' : 'ios-add';
            } else if(route.name === 'Moje Konto'){
              iconName = focused ? 'person-sharp':'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color}/>;
          },
         })}>
          
          {isLogged ? (
            <>
            
              <Stack.Screen 
                name="Główna" 
                component={HomeScreen}
                options={{
                  headerTitle: () => (
                    <Image
                      source={logo}
                      style={{
                        height: 40,
                        width: 40,
                        marginLeft: 10,
                        flex: 0
                      }}
                    />
                  ),
                headerRight: () => (
                    <TouchableOpacity
                      onPress={() => logOut()}
                      style={styles.logoutButton}
                    >
                      <Image style={styles.logoutImage} source={logoutIcon}></Image>
                      <Text style={styles.logoutText}>WYLOGUJ</Text>
                    </TouchableOpacity>
                  ),
              }}/>

              <Stack.Screen 
                name="Ankiety" 
                component={PollList}
                options={{
                  headerTitle: () => (
                    <Image
                      source={logo}
                      style={{
                        height: 40,
                        width: 40,
                        marginLeft: 10,
                        flex: 0
                      }}
                    />
                  ),
                  headerRight: () => (
                    <TouchableOpacity
                      onPress={() => logOut()}
                      style={styles.logoutButton}
                    >
                      <Image style={styles.logoutImage} source={logoutIcon}></Image>
                      <Text style={styles.logoutText}>WYLOGUJ</Text>
                    </TouchableOpacity>
                    ),
              }}/>
              <Stack.Screen 
                name="Dodaj" 
                component={CreatePoll}
                options={{
                  headerTitle: () => (
                    <Image
                      source={logo}
                      style={{
                        height: 40,
                        width: 40,
                        marginLeft: 10,
                        flex: 0
                      }}
                    />
                  ),
                headerRight: () => (
                    <TouchableOpacity
                      onPress={() => logOut()}
                      style={styles.logoutButton}
                    >
                      <Image style={styles.logoutImage} source={logoutIcon}></Image>
                      <Text style={styles.logoutText}>WYLOGUJ</Text>
                    </TouchableOpacity>
                  ),
              }}/>
              <Stack.Screen
                name="Moje Konto"
                component={Account}
                options={{
                  headerTitle: () => (
                    <Image
                      source={logo}
                      style={{
                        height: 40,
                        width: 40,
                        marginLeft: 10,
                        flex: 0
                      }}
                    />
                  ),
                  headerRight: () => (
                    <TouchableOpacity
                      onPress={() => logOut()}
                      style={styles.logoutButton}
                    >
                      <Image style={styles.logoutImage} source={logoutIcon}></Image>
                      <Text style={styles.logoutText}>WYLOGUJ</Text>
                    </TouchableOpacity>
                  ),
                }}
              />
            </>
              
          ) : (
            <>
              <Stack.Screen
               name="Login" 
               component={Login} 
               options={{
                headerTitle: () => (
                  <Image
                    source={logo}
                    style={{
                      height: 40,
                      width: 40,
                      marginLeft: 10,
                      flex: 0
                    }}
                  />
                ),
              }}
               initialParams={{logHandler: setLoggedHandler}}/>
              <Stack.Screen
               name="Registration" 
               options={{
                headerTitle: () => (
                  <Image
                    source={logo}
                    style={{
                      height: 40,
                      width: 40,
                      marginLeft: 10,
                      flex: 0
                    }}
                  />
                )
              }}
               component={RegistrationScreen}/>
            </>
          )}
          
        </Stack.Navigator>
        <ToastManager
          position="top" 
          theme="dark"
          style={{
            width: "100%",
            height: 100,
            marginTop: -50
          }}
        />
      </NavigationContainer>
    );
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
  logoutButton: {
    width: 60,
    marginRight: 10,
    height: 40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logoutImage: {
    width: 30,
    height: 30,
  },
  logoutText: {
    color: "#ffffff",
    fontSize: 10,
    width: "100%",
    textAlign: "center"
  }
});