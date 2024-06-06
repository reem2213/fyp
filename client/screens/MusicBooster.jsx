import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TRACKS } from "../components/tracks-data";
import { useEffect, useState } from "react";
import AlbumCover from "../components/AlbumCover";
import AlbumDetails from "../components/AlbumDetails";
import Controls from "../components/Controls";
// import Video from "../node_modules/react-native-video";

const MusicBooster = () => {
  


  const [selectedTrack, setSelectedTrack] = useState(0);
  const [pause, setPause] = useState(false);

  const currentTrack = TRACKS[selectedTrack];

  function togglePlayPause() {
    setPause(!pause);
  }
  function playNextSong() {
    setSelectedTrack(selectedTrack + 1);
  }

  function playPrevSong() {
    setSelectedTrack(selectedTrack - 1);
  }

  // console.log("Platform:", Platform.OS);

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <AlbumCover albumCover={currentTrack.albumArtUrl} />

        <AlbumDetails
          trackName={currentTrack.title}
          artistName={currentTrack.artist}
        />

        <Controls
          {...{ togglePlayPause }}
          {...{ pause }}
          {...{ playPrevSong }}
          {...{ playNextSong }}
        />
        {/* <Video source={{uri:currentTrack.audioUrl}} audioOnly paused={pause}/> */}
      

        
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111436",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default MusicBooster;
