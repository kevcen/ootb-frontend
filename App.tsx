import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import useCachedResources from "./src/hooks/useCachedResources";
import RecipientCategoriesScreen from "./src/screens/quiz/recipient/RecipientCategoriesScreen";
import SenderCategoriesScreen from "./src/screens/quiz/sender/SenderCategoriesScreen";
import SenderRecommendationScreen from "./src/screens/quiz/sender/SenderRecommendationScreen";
import RecipientRecommendationScreen from "./src/screens/quiz/recipient/RecipientRecommendationScreen";
import ErrorScreen from "./src/screens/ErrorScreen";
import RecipientContextScreen from "./src/screens/quiz/sender/RecipientContextScreen";
import SenderContextScreen from "./src/screens/quiz/recipient/SenderContextScreen";
import OccasionScreen from "./src/screens/quiz/sender/OccasionScreen";
import HomeScreen from "./src/screens/HomeScreen";
import FoodScreen from "./src/screens/quiz/categories/FoodScreen";
import BudgetScreen from "./src/screens/quiz/sender/BudgetScreen";
import FashionScreen from "./src/screens/quiz/categories/FashionScreen";
import MusicScreen from "./src/screens/quiz/categories/MusicScreen";
import PhotographyScreen from "./src/screens/quiz/categories/PhotographyScreen";
import SportScreen from "./src/screens/quiz/categories/SportScreen";
import FragranceScreen from "./src/screens/quiz/categories/FragranceScreen";
import GardeningScreen from "./src/screens/quiz/categories/GardeningScreen";
import HealthBeautyScreen from "./src/screens/quiz/categories/HealthBeautyScreen";
import HomeDecorScreen from "./src/screens/quiz/categories/HomeDecorScreen";
import RecipientIntroScreen from "./src/screens/quiz/recipient/RecipientIntroScreen";
import SenderIntroScreen from "./src/screens/quiz/sender/SenderIntroScreen";

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
            name="SenderIntro"
            component={SenderIntroScreen}
          />
          <Stack.Screen
            name="RecipientIntro"
            component={RecipientIntroScreen}
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
            name="Fashion"
            component={FashionScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Music"
            component={MusicScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Photography"
            component={PhotographyScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Sport"
            component={SportScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Fragrance"
            component={FragranceScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Gardening"
            component={GardeningScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Health & Beauty"
            component={HealthBeautyScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home Decor"
            component={HomeDecorScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Occasions"
            component={OccasionScreen}
          />
          <Stack.Screen
            name="SenderRecommendations"
            component={SenderRecommendationScreen}
          />
          <Stack.Screen
            name="RecipientRecommendations"
            component={RecipientRecommendationScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Budget"
            component={BudgetScreen}
          />
          <Stack.Screen name="Error" component={ErrorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
