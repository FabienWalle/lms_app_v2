import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import CertificationsServices from '../../api/services/certifications.services'
import AsyncStorage from "@react-native-async-storage/async-storage";

const CertificationCoursesScreen = ({ navigation }) => {
  const [CertificationCoursesList, setCertificationCoursesList] = useState();
  const GrabCertificationCourses = async () => {
    try {
      let res = await CertificationsServices.CertificationCourses()
      let data = res.data.map(item => item)
      setCertificationCoursesList(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    GrabCertificationCourses();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Détails de la formation</Text>
      <View style={styles.list}>
        <FlatList
          data={CertificationCoursesList}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.card}>
              <TouchableOpacity
                onPress={async () => {
                  await AsyncStorage.removeItem('Course_id')
                  await AsyncStorage.setItem('Course_id', `${item.id}`)
                  navigation.navigate("CourseScreen");
                }
              }>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.duration}>Durée de la formation : {item.duration}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default CertificationCoursesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
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
  },
});
