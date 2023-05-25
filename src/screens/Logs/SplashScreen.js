import React, { useEffect } from 'react'
import { Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import BottomTabNavigator from '../../navigators/BottomTabNavigator';
// import LoginScreen from './LoginScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, useStyleSheet, StyleService, Avatar } from '@ui-kitten/components';
import AuthServices from '../../api/services/auth.services';


const SplashScreen = ({navigation}) => {
    const styles = useStyleSheet(themedStyles);

    const amILogged = async () => {
        let token = await AsyncStorage.getItem('token')
        if (!!token) {
            navigation.navigate('LoginScreen')
        } else {
            let response = await AuthServices.Me();
            await AsyncStorage.setItem("id", response.data.id.toString());
            navigation.navigate('BottomTabNavigator')
        }
    }
    useEffect(() => { amILogged() }, [])
    return (
       <SafeAreaView style={styles.container}>
            <Layout >
                <Image
                resizeMode='contain'
                style={styles.image}
                source={require('../../../assets/logoRI7.png')}
                />
            </Layout>
            </SafeAreaView>
     
    )
}

export default SplashScreen

const themedStyles = StyleService.create({
container : {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'basic'
},
image : {
    width:200,
    height:100,

}
})