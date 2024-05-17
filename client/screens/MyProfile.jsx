import { Text, TouchableOpacity, View } from "react-native";

const MyProfile=({navigation})=>{
    const Logout=()=>{
        navigation.navigate("SignIn");

    }

    return (
        <View style={{alignItems:"center",top:100}}>
            <Text>My profile</Text>
            <TouchableOpacity onPress={Logout}>
            <Text>Logout</Text>

            </TouchableOpacity>
        </View>
    )

}
export default MyProfile;