import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView} from 'react-native';



function HomeScreen(){
    return(
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <ScrollView style={{width: "100%"}}>
              <Text style={styles.containerText}>Poznaj „Jaskółkę”</Text>
              <Text style={styles.mainText}>Dzięki tej aplikacji możesz przeprowadzac ankiety i referenda w celu pozyskania opinii społeczności na różne tematy. Jaskółka zapewnia dostęp do danyh statystycznych dla każdej z ankiet. Twórz własne ankiety oraz udzielaj się w tych już istniejących. Pamiętaj!!! Jako obywatel masz prawo do decydowania o swoim państwie!</Text>
              <View style={styles.break} />
              <Text style={styles.containerText}>Wczesny dostęp</Text>
              <Text style={styles.mainText}>Jaskółka jest na etapie aktywnego rozwoju i obecnie jest w fazie wczesnego dostępu. W przyszłości pojawią się tutaj rozbudowane funkcje dla lokalnych samorządów oraz zwykłych użytkowników. Zachęcamy do testowania aplikacji i dzielenia się nią z innymi!</Text>
            </ScrollView>
          </View>
        </View>
    )
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    height: '100%',
    padding: 5,
  },
  containerText: {
    color: '#fff',
    fontWeight: "bold",
    fontSize: 30,
    paddingBottom: 10,
  },
  mainText: {
    width: '100%',
    color: '#fff',
    fontSize: 17,
    marginBottom: 20,
  },
  break: {
    width: '100%',
    height: 2,
    backgroundColor: '#5193f0',
    marginVertical: 20,
  },
  cardContainer: {
    flex: 3,
    width: "100%",
    backgroundColor: "#00094a",
    borderRadius: 20,
    display: 'flex',
    padding: 20,
    alignItems: 'center',
    flexDirection: 'column',
  },
});

export default HomeScreen
