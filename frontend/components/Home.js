import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';


function HomeScreen(){
    return(
        <View style={styles.container}>
            <Text style={styles.containerText}>Hello Citizen!</Text>
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
  }
});

export default HomeScreen
