import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';


function HomeScreen(){
    return(
        <View style={styles.container}>
            <Text style={styles.containerText}>Hello Citizen!</Text>
            <Text style={styles.mainText}>Dzięki tej aplikacji możesz przeprowadzac ankiety i referenda w celu pozyskania opinii społeczności na różne tematy. Jaskółka zapewnia dostęp do danyh statystycznych dla każdej z ankiet. Twórz własne ankiety oraz udzielaj się w tych już istniejących. Pamiętaj jako obywatel masz prawo do decydowania o swoim państwie!</Text>
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
  },
  mainText: {
    width: '90%',
    padding: 40,
    color: '#fff',
    fontSize: 20,
  },
});

export default HomeScreen
