import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
const Controls = ({ togglePlayPause, pause ,playPrevSong, playNextSong}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={playPrevSong}>
        <AntDesign name="banckward" size={30} color="white" />
      </TouchableOpacity>

      {pause ? (
        <TouchableOpacity style={styles.playPauseBtn} onPress={togglePlayPause}>
          <AntDesign name="playcircleo" size={30} color="#1B1246" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.playPauseBtn} onPress={togglePlayPause}>
          <AntDesign name="pausecircleo" size={30} color="#1B1246" />
        </TouchableOpacity>
      )}

      <TouchableOpacity  onPress={playNextSong}>
        <AntDesign name="forward" size={30} color="white" />
      </TouchableOpacity>
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
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 20,
    margin: 20,
    backgroundColor: "white",
    borderColor: "#1B1246",
  },
});
export default Controls;
