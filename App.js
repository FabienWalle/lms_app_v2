import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./src/navigators/MainNavigator";
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import { default as light_theme } from './light_theme.json'; 
import { EvaIconsPack } from '@ui-kitten/eva-icons';


const App = () => {
  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...light_theme }}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </ApplicationProvider>
    </>
    )
}

export default App