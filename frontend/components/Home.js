import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';



function HomeScreen(){
    return(
        <View style={styles.container}>
            <Text style={styles.containerText}>Poznaj "Jaskółkę"</Text>
            <View style={styles.cardContainer}>

              <Text style={styles.mainText}>Dzięki tej aplikacji możesz przeprowadzac ankiety i referenda w celu pozyskania opinii społeczności na różne tematy. Jaskółka zapewnia dostęp do danyh statystycznych dla każdej z ankiet. Twórz własne ankiety oraz udzielaj się w tych już istniejących. Pamiętaj!!! Jako obywatel masz prawo do decydowania o swoim państwie!</Text>


            
            
            <View style={styles.break}>

            </View>

            
              <Text style={styles.mainText}>Jaskółka jest na etapie aktywnego rozwoju i obecnie jest w fazie wczesnego dostępu. W przyszłości pojawią się tutaj rozbudowane funkcje dla lokalnych samorządów oraz zwykłych użytkowników. Zachęcamy do testowania aplikacji i dzielenia się nią z innymi!</Text>

            </View>
           

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
    paddingBottom: 10,
  },
  mainText: {
    width: '90%',
    padding: 40,
    color: '#fff',
    fontSize: 17,
  },
  break: {
    width: '90%',
    height: 4,
    backgroundColor: '#5193f0',
  },
  cardContainer: {
    minHeight: 80,
    width: "98%",
    backgroundColor: "#00094a",
    borderRadius: 20,
    overflow: "hidden",
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

export default HomeScreen
