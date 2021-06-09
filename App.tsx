import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import CategoriesScreen from "./src/screens/quiz/categories/CategoriesScreen";
import RecommendationScreen from "./src/screens/RecommendationScreen";
import ErrorScreen from "./src/screens/ErrorScreen";
import RecipientContextScreen from "./src/screens/quiz/sender/RecipientContextScreen";
import SenderContextScreen from "./src/screens/quiz/recipient/SenderContextScreen";
import OccasionScreen from "./src/screens/quiz/sender/OccasionScreen";
import HomeScreen from "./src/screens/HomeScreen";
import FoodScreen from "./src/screens/quiz/categories/FoodScreen";
import BudgetScreen from "./src/screens/quiz/common/BudgetScreen";

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
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Recipient" component={SenderContextScreen} />
          <Stack.Screen name="Sender" component={RecipientContextScreen} />
          <Stack.Screen name="Categories" component={CategoriesScreen} />
          <Stack.Screen name="Budget" component={BudgetScreen} />
          <Stack.Screen name="Food" component={FoodScreen} />
          <Stack.Screen name="Occasions" component={OccasionScreen} />
          <Stack.Screen
            name="Recommendations"
            component={RecommendationScreen}
          />
          <Stack.Screen name="Error" component={ErrorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
