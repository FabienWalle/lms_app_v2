import { StyleSheet, View } from "react-native";
import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Icon, DrawerItem } from '@ui-kitten/components';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const DrawerContent = (props) => {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View>
            <DrawerItem
              accessoryLeft={
                <Icon 
                name="log-out-outline"
                width={30}
                height={30}/>
              }
              title="Déconnexion"
              onPress={() => {
                AsyncStorage.removeItem("token")
                props.navigation.navigate("LoginScreen");
              }}
            />
          </View>
        </DrawerContentScrollView>
      </View>
    </SafeAreaProvider>
  );
};

export default DrawerContent;

