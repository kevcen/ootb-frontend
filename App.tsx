import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import IntroScreen from "./src/screens/IntroScreen";
import CategoriesScreen from "./src/screens/quiz/sender/CategoriesScreen";
import RecommendationScreen from "./src/screens/RecommendationScreen";
import ErrorScreen from "./src/screens/ErrorScreen";
import RecipientContextScreen from "./src/screens/quiz/sender/RecipientContextScreen";
import SenderContextScreen from "./src/screens/quiz/sender/SenderContextScreen";

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
          <Stack.Screen name="Recipient" component={RecipientContextScreen} />
          <Stack.Screen name="Sender" component={SenderContextScreen} />
          <Stack.Screen name="Categories" component={CategoriesScreen} />
          <Stack.Screen name="Recommendations" component={RecommendationScreen} />
          <Stack.Screen name="Error" component={ErrorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
