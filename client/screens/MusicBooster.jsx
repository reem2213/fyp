import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TRACKS } from "../components/tracks-data";
import { useEffect, useState } from "react";
import AlbumCover from "../components/AlbumCover";
import AlbumDetails from "../components/AlbumDetails";
import Controls from "../components/Controls";
// import Video from "react-native-video";

const MusicBooster = () => {
  const tracks = [
    {
      id: 1,
      url: require("../tracks/ASitarStory.mp3"),
      title: "sitar story",
    },
    {
      id: 2,
      url: require("../tracks/BetterDays.mp3"),
      title: "Better Days",
    },
    {
      id: 3,
      url: require("../tracks/SweetMath.mp3"),
      title: "sweet math",
    },
  ];
  TrackPlayer.updateOptions({
    stopWithApp: false,
    capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
    compactCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
    ],
  });

  const setUpTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(tracks);
    } catch (e) {
      console.log(e);
    }

    useEffect(() => {
      setUpTrackPlayer();
      return () => TrackPlayer.destroy();
    }, []);
  };

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
  return (
    <>
      {/* <StatusBar hidden />
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
        /> */}

      {/* <Video source={{uri:currentTrack.audioUrl}}/> */}
      {/* </View> */}

      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.text}>Pause</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.text}>Play</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.text}>Prev</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.text}>Next</Text>
          </TouchableOpacity>
        </View>
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
