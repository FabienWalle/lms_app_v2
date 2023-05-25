import { useState } from "react";
import { Layout, Text, Button, Input, Spinner, Icon, useStyleSheet, StyleService } from '@ui-kitten/components';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthServices from "../../api/services/auth.services";
import { SafeAreaProvider } from 'react-native-safe-area-context';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const styles = useStyleSheet(themedStyles);

  const Login = async () => {
    setLoading(true)
    await AsyncStorage.removeItem('token')
    try {
      let res = await AuthServices.Login({ username: email, password })
      await AsyncStorage.setItem("token", res.data.token)
      let response = await AuthServices.Me();
      await AsyncStorage.setItem("id", response.data.id.toString());
      navigation.navigate("BottomTabNavigator")
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  }

  return (
    <SafeAreaProvider>
      <Layout level='1' style={styles.container}>
        {
          loading ? (
            <>
              <Spinner size='giant' />
            </>
          ) : (
            <>
              <Text
                category='h1'
                style={styles.text}
                status="primary"
              >
                Se connecter
              </Text>
              <Input
                accessoryRight={<Icon name="email" />}
                style={styles.input}
                placeholder="email"
                value={email}
                onChangeText={(e) => setEmail(e)}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Input
                accessoryRight={<Icon name="lock" status="basic" />}
                style={styles.input}
                secureTextEntry
                placeholder="password"
                value={password}
                onChangeText={(e) => setPassword(e)}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Button
                style={styles.signInButton}
                status='primary'
                size='giant'
                onPress={Login}
              >
                Se connecter
              </Button>
            </>
          )}
      </Layout>
    </SafeAreaProvider>
  );
};

export default LoginScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 216,
    paddingHorizontal: 30,
  },
  text: {
    textTransform: "uppercase",
    marginBottom: 10,
  },
  input: {
    color: "success",
    marginTop: 10
  },
  signInButton: {
    marginHorizontal: 16,
    marginTop: 20
  },

});
