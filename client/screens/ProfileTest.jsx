import { View,Image,Text, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Profile = ({ route }) => {
    const { username, bio, imageUri } = route.params;
    const { userInfo } = route.params;
    const { navigate }=useNavigation();
    const HomePage=()=>{
        navigate('Home');
    }
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, borderRadius: 100 }} />}
        <Text>Username: {username}</Text>
        <Text>Bio: {bio}</Text>
        <Button title="next" onPress={HomePage}></Button>
      </View>
    );
  };

export default Profile;  