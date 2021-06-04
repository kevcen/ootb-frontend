import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import IntroScreen from "./src/screens/IntroScreen";
import CategoriesScreen from "./src/screens/CategoriesScreen";
import RecommendationScreen from "./src/screens/RecommendationScreen";
import NotFoundScreen from "./src/screens/NotFoundScreen";
import ErrorScreen from "./src/screens/ErrorScreen";
import LoadingScreen from "./src/screens/LoadingScreen";

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
          <Stack.Screen name="Categories" component={CategoriesScreen} />
          <Stack.Screen name="Recommendations" component={RecommendationScreen} />
          <Stack.Screen name="Error" component={ErrorScreen} />
          <Stack.Screen name="Loading" component={LoadingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
