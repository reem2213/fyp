import { View ,Text,TouchableOpacity, StyleSheet} from "react-native";

const Screen1=({navigation})=>{
    const back=()=>{
        navigation.navigate("Home")

    }

    return (
        <View>
            <Text style={{marginTop:100, marginLeft:50}}>hi dkjjfsojsfopkefeokwfpwopejnijdowqpskwp</Text>
            <TouchableOpacity onPress={back} style={styles.button}>
        <Text style={styles.buttonText}>hi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 150,
    marginLeft: 50,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Screen1;