import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from "react-native";
import { useState, useEffect, useCallback, useRef  } from "react";
import CertificationsServices from '../../api/services/certifications.services'
import YoutubePlayer from "react-native-youtube-iframe";

const CourseScreen = () => {
  const [Course, setCourse] = useState();
  const GrabCertifications = async () => {
    try {
      let res = await CertificationsServices.Course();
      res = res.data
      setCourse(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    GrabCertifications();
  }, []);

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Le cours</Text>
      {Course && <View style={styles.list}>
        <View style={styles.card}>
          <Text style={styles.title}>{Course.name}</Text>
          <Text style={styles.description}>{Course.description}</Text>
          <Text style={styles.duration}>Durée de la formation : {Course.duration}</Text>
        </View>
      </View>}
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={"iee2TATGMyI"}
        onChangeState={onStateChange}
      />
      <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
    </View>
  );
}

export default CourseScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold"
  },
  detail: {
    fontSize: 15
  },
  description: {
    flexWrap: "wrap",
  },
  card: {
    border: 5,
    borderColor: "blue",
    borderWidth: 5,
    marginVertical: 5,
  },
  header: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: "bold",
    textAlign:"center"
  },
});