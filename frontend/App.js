import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Lottie from 'lottie-react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Lottie source={require('./assets/splash.json')} autoPlay loop />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerText: {
    color: '#fff',
    fontSize: 30,
  }
});
