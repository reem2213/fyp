import { View, Image, Text, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Settings from "../assets/settings.png";
const Profile = ({ route }) => {
  const { username, bio, imageUri } = route.params;
  const { userInfo } = route.params;
  const { navigate } = useNavigation();
 

  const goToSettings = () => {
    navigate("Settings");
  };

  return (
    <>
      <View>
        <Text
          style={{
            color: "#032B79",
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
            top: 40,
          }}
        >
          Profile
        </Text>
        <TouchableOpacity onPress={goToSettings}>
        <Image
          style={{ width: 45, height: 45, left: 320, top: -10 }}
          source={Settings}
        />
        </TouchableOpacity>
       
        <Text
          style={{ color: "gray", fontSize: 20, fontWeight: "600", left: 40 }}
        >
          550 Pts
        </Text>
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              top: 20,
              left: 20,
            }}
          />
        )}
      </View>
      <View>
        <Text style={{ top: -90, left: 190, fontSize: 15, fontWeight: "500" }}>
          {username}
        </Text>
        <Text style={{ top: -80, left: 190, fontSize: 15, fontWeight: "500" }}>
          {bio}
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              backgroundColor: "white",
              width: "40%",
              borderColor: "#E5E0E0",
              borderWidth: 1,
              borderRadius: 10,
              padding: 5,
              textAlign: "center",
              left:185,
              top:-60
            }}
          >
            Edit your Profile
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Profile;
