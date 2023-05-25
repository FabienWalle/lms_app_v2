import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react'

const ProfileScreen = () => {
    return (
        <SafeAreaProvider>
            <View style={styles.profile}>
                <Text>Profile!</Text>
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    profile: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ProfileScreen

