import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import QuestionScreen from "./src/screens/QuestionScreen";
import IntroScreen from "./src/screens/IntroScreen";
import InterestScreen from "./src/screens/InterestScreen";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const Stack = createStackNavigator();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={IntroScreen} />
          <Stack.Screen name="Interest" component={InterestScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
