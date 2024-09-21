
import { View, Text, Image, Pressable,StyleSheet,Platform } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import GoogleIcon from '../assets/google.png'
import { useNavigation } from "@react-navigation/native";
if (Platform.OS !== 'web') {
  WebBrowser.maybeCompleteAuthSession();
}

const AuthenticationTester = ({navigation}) => {
  const { navigate } = useNavigation();

  WebBrowser.maybeCompleteAuthSession();
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "401952058204-mqaei82n0ppudandl1jg70e9o3fckkdk.apps.googleusercontent.com",
    iosClientId:
      "401952058204-2icuf068v4pccidni0mfej7gdn9k5lvr.apps.googleusercontent.com",
    webClientId:
      "401952058204-vb1ku0ok1u9m42fp9n9s612kp1ho7u0f.apps.googleusercontent.com",
      scopes: ['profile', 'email'],
  });

  useEffect(() => {
    handleSignInWithGoole();
  }, [response]);
 

  async function handleSignInWithGoole() {
    console.log("handleSignInWithGoogle called");

    const user = await AsyncStorage.getItem(userInfo);

    if (!user) {
      if (response?.type == "success") {
        console.log("Successful response:", response);

        await fetchUserInfo(response.authentication.accessToken);
       navigate("Home",{userInfo});

      }
      else{
        console.log("No user data found in AsyncStorage");


      }
    } else {

      setUserInfo(JSON.parse(user));
    }
  }

  
  async function fetchUserInfo(token) {
    console.log("fetchUserInfo called with token:", token);

    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      console.log("User info fetched successfully:", user);

      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
      console.log(JSON.stringify(user))

   navigate("Home",{userInfo});
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }
  return (
    <View style={styles.container}>
      
{/* <Text>{JSON.stringify(userInfo,null,2)}</Text> */}
      <Pressable onPress={()=>promptAsync()}>
        <Image source={GoogleIcon} style={styles.googleIcon}/>
        {/* <Text style={styles.googleText}>Sign in with google</Text> */}
      </Pressable>

    </View>
  );
};
const styles=StyleSheet.create({
  googleIcon:{
    width:30,
    height:30,
    position :"absolute"
    ,
    marginLeft:190,
    top:520
  },
  // googleText:{
  //   position :"absolute",
  //   marginLeft:170,
  //   top:485,
  //   color:"white"
  // },
  
})
export default AuthenticationTester;



// email
// : 
// "rimdib311@gmail.com"
// family_name
// : 
// "deeb"
// given_name
// : 
// "reem"
// id
// : 
// "107629301746397214229"
// locale
// : 
// "en-US"
// name
// : 
// "reem deeb"
// picture
// : 
// "https://lh3.googleusercontent.com/a/ACg8ocIDl_QJwCu9odMNif1305qh1vM8Ue65z1vCGSZz0T0gwvNdL68u=s96-c"
// verified_email
// : 
// true
// [[Prototype]]


// import { View, Text, Pressable } from "react-native";
// import * as Google from "expo-auth-session/providers/google";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as WebBrowser from "expo-web-browser";
// import { useEffect, useState } from "react";
// import ShowUserInfo from "../components/ShowUserInfo";

// const AuthenticationTester = () => {
//   WebBrowser.maybeCompleteAuthSession();

//   // Ensure correct handling of the auth state
//   const [userInfo, setUserInfo] = useState(null);
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     androidClientId: "401952058204-26914hadiog7cql9v7f81nnnjih2l5tt.apps.googleusercontent.com",
//     iosClientId: "401952058204-2icuf068v4pccidni0mfej7gdn9k5lvr.apps.googleusercontent.com",
//     webClientId: "401952058204-vb1ku0ok1u9m42fp9n9s612kp1ho7u0f.apps.googleusercontent.com",
//     // scopes: ['profile', 'email'],
//   });

//   useEffect(() => {
//     if (response?.type === "success") {
//       handleSignInWithGoogle();
//     }
//   }, [response]);

//   const handleSignInWithGoogle = async () => {
//     const user = await AsyncStorage.getItem("@user");
//     if (!user && response?.type === "success") {
//       await fetchUserInfo(response.authentication.accessToken);
//     } else {
//       setUserInfo(JSON.parse(user));
//     }
//   };

//   const fetchUserInfo = async (token) => {
//     if (!token) return;
//     try {
//       const response = await fetch(
//         "https://www.googleapis.com/userinfo/v2/me",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const user = await response.json();
//       await AsyncStorage.setItem("@user", JSON.stringify(user));
//       setUserInfo(user);
//     } catch (error) {
//       console.error("Error fetching user info:", error);
//     }
//   };

//   return (
//     <View style={{ marginLeft: 150, marginTop: 20 }}>
//       <Text>{JSON.stringify(userInfo, null, 2)}</Text>
//       <Pressable onPress={() => promptAsync()}>
//         <Text style={{ marginLeft: 50, marginTop: 120 }}>Sign in with Google</Text>
//       </Pressable>
//       <Pressable onPress={() => {
//         AsyncStorage.removeItem("@user");
//         setUserInfo(null);
//       }}>
//         <Text style={{ marginLeft: 50, marginTop: 150 }}>Logout</Text>
//       </Pressable>
//     </View>
//   );
// };

// export default AuthenticationTester;
