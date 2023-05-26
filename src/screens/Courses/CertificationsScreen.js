import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";
import { useState, useEffect } from "react";
import CertificationsServices from '../../api/services/certifications.services'
import { API_URL } from '@env'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const CertificationsScreen = ({ navigation }) => {
  const [CertificationsList, setCertificationsList] = useState();
  const GetCertifications = async () => {
    try {
      let res = await CertificationsServices.Certifications();
      let data = res.data.map(item => item)
      setCertificationsList(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    GetCertifications();
  }, []);

  return (
    <SafeAreaProvider>
    <View style={styles.container}>
      <Text style={styles.header}>Ma liste de cours</Text>
      <View style={styles.list}>
        <FlatList
          data={CertificationsList}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.card}>
              <TouchableOpacity
                onPress={async () => {
                  await AsyncStorage.removeItem('Certification_id')
                  await AsyncStorage.setItem('Certification_id',`${item.id}`)
                  navigation.navigate("CertificationCoursesScreen")}}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Image
                  style={styles.images}
                  source={{ uri: `${API_URL}` +"/"+ item.relativePath }} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
    </SafeAreaProvider>
  );
};

export default CertificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  list: {
    flex: 1,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  description: {
    fontSize: 20,
  },
  header: {
    fontSize: 50,
    textAlign: "center",
  },
  card: {
    marginVertical: 10,
    width: 400,
    height: 400,
    borderColor: "black",
    borderWidth: 3,
    flex:1,
    justifyContent:"space-between"
  },
  images: {
    marginTop:40,
    width: "100%",
    height: 200,
    resizeMode: 'cover'
  }
});
