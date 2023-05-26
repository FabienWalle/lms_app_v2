import { useState } from "react";
import { Image, TouchableWithoutFeedback } from "react-native";
import { Layout, Text, Button, Input, Spinner, Icon, useStyleSheet, StyleService } from '@ui-kitten/components';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthServices from "../../api/services/auth.services";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false)
  const styles = useStyleSheet(themedStyles);

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  const renderIconPassword = (props) => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name='lock'/>
    </TouchableWithoutFeedback>
  );

  const Login = async () => {
    setLoading(true)
    try {
      let LoginRequest = await AuthServices.Login({ username: email, password })
      await AsyncStorage.setItem("token", LoginRequest.data.token)
      let res = await AuthServices.Me();
      await AsyncStorage.setItem("id", res.data.id.toString());
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
              <Image
                resizeMode='contain'
                style={styles.image}
                source={require('../../../assets/logoRI7.png')}
              />
              <Text
                category='h1'
                style={styles.text}
                status="primary"
              >
                Connexion
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
                secureTextEntry={!passwordVisible}
                accessoryRight={renderIconPassword}
                style={styles.input}
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
                Connexion
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
    paddingHorizontal: 40,
  },
  text: {
    textTransform: "capitalize",
    marginVertical: 10,
    fontWeight: "400"
  },
  input: {
    color: "success",
    marginTop: 20
  },
  signInButton: {
    marginHorizontal: 16,
    marginTop: 30,
    width: "100%"
  },
  image: {
    width: 200,
    height: 100,
    marginBottom: 20
  }

});
