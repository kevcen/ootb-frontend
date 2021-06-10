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
import SenderContextScreen from "./src/screens/quiz/sender/SenderContextScreen";
import RecipientContextScreen from "./src/screens/quiz/recipient/RecipientContextScreen";
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
import RankingScreen from "./src/screens/quiz/recipient/RankingScreen";

const defaultQuizScreenOptions = { title: "Quiz", headerLeft: () => null };

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
            options={{ title: "Home" }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{ title: "" }}
            name="SenderIntro"
            component={SenderIntroScreen}
          />
          <Stack.Screen
            options={{ title: "" }}
            name="RecipientIntro"
            component={RecipientIntroScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions}
            name="Sender"
            component={SenderContextScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions}
            name="Recipient"
            component={RecipientContextScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions}
            name="RecipientCategories"
            component={RecipientCategoriesScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions}
            name="SenderCategories"
            component={SenderCategoriesScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions}
            name="Food"
            component={FoodScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions}
            name="Fashion"
            component={FashionScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions}
            name="Music"
            component={MusicScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions}
            name="Photography"
            component={PhotographyScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions}
            name="Sport"
            component={SportScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions}
            name="Fragrance"
            component={FragranceScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions}
            name="Gardening"
            component={GardeningScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions}
            name="Health & Beauty"
            component={HealthBeautyScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions}
            name="Home Decor"
            component={HomeDecorScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions}
            name="Occasions"
            component={OccasionScreen}
          />
          <Stack.Screen
            options={{ title: "" }}
            name="SenderRecommendations"
            component={SenderRecommendationScreen}
          />
          <Stack.Screen
            options={{ title: "" }}
            name="RecipientRecommendations"
            component={RecipientRecommendationScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Budget"
            component={BudgetScreen}
          />
          <Stack.Screen name="Ranking" component={RankingScreen} />
          <Stack.Screen
            options={{ title: "" }}
            name="Error"
            component={ErrorScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
