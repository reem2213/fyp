import React,{useEffect,useState,useContext} from 'react'
import CommunityDark from "../assets/communityDark.png";
import HomeDark from "../assets/homeDark.png";
import SettingsDark from "../assets/settings.png";
import PsychoDark from "../assets/psychologicDark.png";
import PhysicalDark from "../assets/physicalSectionDark.png";
import Psycho from "../assets/psychologicLight.png";
import Physical from "../assets/physicalSectionLight.png";
import SettingsIcon from "../assets/LightSettings.png";
import HomeIcon from "../assets/homeLight.png";
import CommunityLight from "../assets/communityLight.png";

import axios from 'axios';
import { DarkModeContext } from './DarkModeContext';
import { View,TouchableOpacity,Image,Text } from 'react-native';
const Tab = ({userId,navigation}) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [bio, setBio] = useState("");
  const[username,setUsername]=useState("")
  const [imageData, setImageData] = useState(null);
  const [focusedButton, setFocusedButton] = useState(null);

  useEffect(() => {
    fetchUserProfile();

  }, []);

 


  const fetchUserProfile = async () => {
  
    try {
      const response = await axios.get(`http://10.0.0.21:3001/user/${userId}`);
      setBio(response.data.bio);
      setImageData(response.data.image);
      setUsername(response.data.username)
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  const ToHome = (button) => {
    setFocusedButton(button);
    navigation.navigate("Home", { username, bio, imageData, userId });
  };
  const ToCommunity = (button) => {
    setFocusedButton(button);
    navigation.navigate("Community", { username, bio, imageData, userId });
  };
  const ToPsychologicalSection = (button) => {
    setFocusedButton(button);
    navigation.navigate("PsychologicalSection", {
      username,
      bio,
      imageData,
      userId,
    });
  };

  const ToPhysicalSection = (button) => {
    setFocusedButton(button);
    checkPhysicalAttributes();
  };

  const ToSettings = (button) => {
    setFocusedButton(button);
    navigation.navigate("Settings", { username, bio, imageData, userId });
  };
  return (
    <View
        style={[
          {
            flexDirection: "row",
            height: 70,
            padding: 7,
            top: -70,
            justifyContent: "space-around",
          },
          { backgroundColor: isDarkMode ? "black" : "#fff" },
        ]}
      >
        <TouchableOpacity onPress={() => ToHome("home")}>
          <Image
            source={focusedButton === "home" ? HomeDark : HomeIcon}
            style={{ margin: 10, width: 50, height: 50, top: -5 }}
          />
          <Text
            style={{
              fontSize: 8,
              position: "absolute",
              top: 52,
              left: 25,
              color: "#032B79",
            }}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => ToCommunity("community")}>
          <Image
            source={
              focusedButton === "community" ? CommunityDark : CommunityLight
            }
            style={{ margin: 10, width: 50, height: 50, top: -5 }}
          />
          <Text
            style={{
              fontSize: 8,
              position: "absolute",
              top: 52,
              left: 15,
              color: "#032B79",
            }}
          >
            Community
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => ToPsychologicalSection("psychoSection")}>
          <Image
            source={focusedButton === "psychoSection" ?PsychoDark:Psycho}
            style={{ margin: 10, width: 45, height: 45, top: -5 }}
          />
          <Text
            style={{
              fontSize: 8,
              position: "absolute",
              top: 52,
              left: 15,
              color: "#032B79",
            }}
          >
            PsychoSection
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => ToPhysicalSection("physicalSection")}>
          <Image
            source={focusedButton === "physicalSection" ?PhysicalDark:Physical}
            style={{ margin: 10, width: 40, height: 40, top: -5 }}
          />
          <Text
            style={{
              fontSize: 8,
              position: "absolute",
              top: 52,
              left: 15,
              color: "#032B79",
            }}
          >
            Physical
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => ToSettings("settings")}>
          <Image source={focusedButton === "settings" ?SettingsDark:SettingsIcon} style={{ margin: 10, top: -5 }} />
          <Text
            style={{
              fontSize: 8,
              position: "absolute",
              top: 52,
              left: 20,
              color: "#032B79",
            }}
          >
            Settings
          </Text>
        </TouchableOpacity>
      </View>
  )
}

export default Tab
