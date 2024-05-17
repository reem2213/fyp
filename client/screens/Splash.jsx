import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";
const SplashScreen = ({ navigation }) => {
  const handleStartPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={[styles.splashScreen, styles.splashLayout]}>
      <LinearGradient
        style={[styles.splashScreenChild, styles.splashLayout]}
        locations={[0.62, 1]}
        colors={["rgba(31, 101, 237, 0.65)", "rgba(84, 92, 108, 0.65)"]}
      />
      <Image
        style={[styles.splashScreenItem, styles.splashPosition]}
        resizeMode="cover" 
        source={require("../assets/transparentEllipse.png")}
      />
      <Image
        style={[styles.splashScreenRemovebgPreviewIcon, styles.splashPosition]}
        resizeMode="cover" 
        source={require("../assets/people.png")}
      />
      <Text
        style={[styles.whereEveryStep, styles.startFlexBox]}
      >{`where every step brings you closer to your best self
`}</Text>
      <Text style={[styles.startYourTransformational, styles.startFlexBox]}>
        Start your transformational journey with HealMe, your guide to a
        brighter tomorrow
      </Text>
      <View style={styles.splashScreenInner} />
      <TouchableOpacity onPress={handleStartPress}>
        <Text style={[styles.letsStart, styles.startFlexBox]}>Let’s Start</Text>
      </TouchableOpacity>
      <Text style={[styles.helloWelcomeTo, styles.startFlexBox]}>{`Hello! Welcome to HealMe`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  splashLayout: {
    height: 1032,
    width: 430,
    marginTop:-50,
    marginLeft:-10,
    borderRadius: Border.br_56xl,
  },
  splashPosition: {
    top: 235,
    position: "absolute",
  },
  startFlexBox: {
    textAlign: "left",
    color: Color.colorWhite,
    position: "absolute",
  },
  splashScreenChild: {
    top: 0,
    left: 1,
    backgroundColor: "transparent",
    position: "absolute",
  },
  splashScreenItem: {
    left: 25,
    width: 369,
    height: 331,
  },
  splashScreenRemovebgPreviewIcon: {
    left: 10,
    height: 334,
    width: 387,
  },
  whereEveryStep: {
    top: 200,
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    left: 36,
    color: Color.colorWhite,
    width: 407,
  },
  startYourTransformational: {
    top: 678,
    fontSize: FontSize.size_mini,
    width: 365,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    left: 36,
    color: Color.colorWhite,
  },
  splashScreenInner: {
    top: 741,
    left: 40,
    borderRadius: Border.br_11xl,
    backgroundColor: "#246dfb",
    width: 333,
    height: 53,
    position: "absolute",
  },
  letsStart: {
    top: 748,
    left: 148,
    fontSize: 25,
    fontWeight: "800",
    fontFamily: FontFamily.interExtraBold,
  },
  helloWelcomeTo: {
    top: 115,
    left: 31,
    fontSize: 35,
    fontWeight: "900",
    fontFamily: FontFamily.interBlack,
    width: 360,
  },
  splashScreen: {
    backgroundColor: Color.colorWhite,
    overflow: "hidden",
  },
});

export default SplashScreen;
