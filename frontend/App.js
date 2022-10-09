import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Lottie from 'lottie-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Splash(){
  return (
    <View style={styles.container}>
      <Lottie source={require('./assets/splash.json')} autoPlay loop />
      <StatusBar style="auto" />
    </View>
  );
}

function HomeScreen(){
  <View style={styles.container}>
      <Text style={styles.containerText}>Hello Citizen!</Text>
  </View>
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} />
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
  }
});
