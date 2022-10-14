import React from "react";

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Form, Input, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from 'react-native-vector-icons';

import Splash from './components/Splash';
import HomeScreen from './components/Home';
import RegistrationScreen from './components/Registration';
import Login from './components/Login'
import PollList from './components/PollList'

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
      <NavigationContainer>
        <Stack.Navigator
         headerMode={'none'}
         screenOptions={({route}) => ({
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === "Polls"){
              iconName = focused ? 'podium':'podium-outline';
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
                headerRight: () => (
                    <Button
                      onPress={() => logOut()}
                      title="Log Out"
                      color="#000"
                    />
                  ),
              }}/>
            </>
              
          ) : (
            <>
              <Stack.Screen
               name="Login" 
               component={Login} 
               initialParams={{logHandler: setLoggedHandler}}/>
              <Stack.Screen
               name="Registration" 
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