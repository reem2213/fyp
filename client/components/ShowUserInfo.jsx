import React from 'react';
import { View,Button, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const ShowUserInfo = ({ route }) => {
    const { userInfo } = route.params;
    const { navigate }=useNavigation();
    const HomePage=()=>{
        navigate('Home');
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: userInfo.picture }} style={{ width: 100, height: 100, borderRadius: 50 }} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>{userInfo.name}</Text>
            <Text style={{ marginTop: 5 }}>Email: {userInfo.email}</Text>
            <Pressable  style={{color: "white", backgroundColor:"lightblue",borderRadius:20, alignContent:"center",alignItems:"center", width:150,height:40}}onPress={HomePage}>Continue</Pressable>
        </View>
    );
};

export default ShowUserInfo;
