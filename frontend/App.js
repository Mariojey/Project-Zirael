import React from "react";

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, Form, Input, TextInput, Button } from 'react-native';
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
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === "Polls"){
              iconName = focused ? 'podium':'podium-outline';
            } else if (route.name === 'Login'){
              iconName = focused ? 'ios-arrow-redo-circle-sharp':'ios-arrow-redo-circle-outline';
            } else if (route.name === 'Registration'){
              iconName = focused ? 'ios-person-add':'ios-person-add-outline';
            } else if(route.name === 'Creator'){
              iconName = focused ? 'ios-add-circle' : 'ios-add';
            } else if(route.name === 'MyAccount'){
              iconName = focused ? 'person-sharp':'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color}/>;
          },
         })}>
          {isLogged ? (
            <>
              <Stack.Screen 
                name="Home" 
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
                    <Button
                      onPress={() => logOut()}
                      title="Log Out"
                      color="#000"
                    />
                  ),
              }}/>

              <Stack.Screen 
                name="Polls" 
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
                      <Button
                        onPress={() => logOut()}
                        title="Log Out"
                        //name="LogOut"
                        color="#000"
                      />
                    ),
              }}/>
              <Stack.Screen 
                name="Creator" 
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
                    <Button
                      onPress={() => logOut()}
                      title="Log Out"
                      color="#000"
                    />
                  ),
              }}/>
              <Stack.Screen
                name="MyAccount"
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
                    <Button
                      onPress={() => logOut()}
                      title="Log Out"
                      color="#000"
                    />
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
});