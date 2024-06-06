import { View,Text ,StyleSheet} from "react-native";

const AlbumDetails=({trackName, artistName})=>{

    return (
        <View style={{justifyContent:'center'}}>
            <Text style={styles.name}>{artistName}</Text>
            <Text style={styles.name}>{trackName}</Text>
        </View>

    )

}
const styles= StyleSheet.create({
    name:{
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold',
        color:"white"

    }
})
export default AlbumDetails;