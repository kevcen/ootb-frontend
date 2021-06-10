import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import useCachedResources from "./src/hooks/useCachedResources";
import RecipientCategoriesScreen from "./src/screens/quiz/recipient/RecipientCategoriesScreen";
import SenderCategoriesScreen from "./src/screens/quiz/sender/SenderCategoriesScreen";
import RecommendationScreen from "./src/screens/RecommendationScreen";
import ErrorScreen from "./src/screens/ErrorScreen";
import RecipientContextScreen from "./src/screens/quiz/sender/RecipientContextScreen";
import SenderContextScreen from "./src/screens/quiz/recipient/SenderContextScreen";
import OccasionScreen from "./src/screens/quiz/sender/OccasionScreen";
import HomeScreen from "./src/screens/HomeScreen";
import FoodScreen from "./src/screens/quiz/categories/FoodScreen";
import BudgetScreen from "./src/screens/quiz/common/BudgetScreen";

const horizontalAnimation = {
  cardStyleInterpolator: ({
    current,
    layouts,
  }: {
    current: any;
    layouts: any;
  }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

export default function App() {
  const isLoadingComplete = useCachedResources();

  const Stack = createStackNavigator();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={horizontalAnimation}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Recipient"
            component={SenderContextScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Sender"
            component={RecipientContextScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="RecipientCategories"
            component={RecipientCategoriesScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SenderCategories"
            component={SenderCategoriesScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Food"
            component={FoodScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Occasions"
            component={OccasionScreen}
          />
          <Stack.Screen
            name="Recommendations"
            component={RecommendationScreen}
          />
          <Stack.Screen name="Budget" component={BudgetScreen} />
          <Stack.Screen name="Error" component={ErrorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
