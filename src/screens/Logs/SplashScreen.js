import React, { useEffect } from 'react'
import { Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, useStyleSheet, StyleService } from '@ui-kitten/components';
import AuthServices from '../../api/services/auth.services';


const SplashScreen = ({ navigation }) => {
    const styles = useStyleSheet(themedStyles);

    const amILogged = async () => {
        try {
            let token = await AsyncStorage.getItem('token')
            if (token == null) {
                navigation.navigate('LoginScreen')
            } else if (token != "") {
                let res = await AuthServices.Me()
                if (res.status == 401) {
                    await AsyncStorage.removeItem('token')
                    navigation.navigate('LoginScreen')
                } else if (res.status == 200) {
                    await AsyncStorage.setItem("id", res.data.id.toString());
                    navigation.navigate('BottomTabNavigator')
                }
            }
        } catch (error) {
            console.log(error);
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'basic'
    },
    image: {
        width: 200,
        height: 100,
    }
})