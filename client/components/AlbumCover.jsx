import { Dimensions, Image, Text, View } from "react-native";

const AlbumCover=({albumCover})=>{
const {width}=Dimensions.get('window').width
    return (
        <View style={{margin:10}}>
            <Image source={{uri:albumCover}} style={{width, height:300, borderRadius:5}} resizeMode="contain"/>
        </View>
    )

}
export default AlbumCover;