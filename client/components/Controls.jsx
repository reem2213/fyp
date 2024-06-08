import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
const Controls = ({ togglePlayPause, pause ,playPrevSong, playNextSong}) => {
  return (
    <View style={styles.container}>
      {pause ? (
        <TouchableOpacity style={styles.playPauseBtn} onPress={togglePlayPause}>
          <AntDesign name="playcircleo" size={20} color="white" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.playPauseBtn} onPress={togglePlayPause}>
          <AntDesign name="pausecircleo" size={20} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 20,
    alignItems: "center",
  },
  playPauseBtn: {
    width: 40,
    
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    margin: 20,
    backgroundColor: "#22CFE7",
  },
});
export default Controls;
