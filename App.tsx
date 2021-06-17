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
import SearchScreen from "./src/screens/wishlist/SearchScreen";
import RankingScreen from "./src/screens/wishlist/RankingScreen";
import CreateProfileScreen from "./src/screens/wishlist/CreateProfileScreen";
import WishlistScreen from "./src/screens/wishlist/WishlistScreen";
import { Button } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import SendEmailScreen from "./src/screens/wishlist/SendEmailScreen";

let defaultQuizScreenOptions = (navigationRef: any, title?: string) => {
  return {
    title: "Quiz" + (title ? " - " + title : ""),
    headerLeft: () => null,
    headerRight: HomeButton(navigationRef),
  };
};

let HomeButton = (navigationRef: any) => () =>
  (
    <TouchableWithoutFeedback
      style={{ flex: 1, justifyContent: "center", padding: 15 }}
      onPress={() => navigationRef.current?.navigate("Home")}
    >
      <Icon name="home" />
    </TouchableWithoutFeedback>
  );

export default function App() {
  const isLoadingComplete = useCachedResources();

  const navigationRef = React.useRef(null);

  const Stack = createStackNavigator();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            options={{ title: "Home", headerShown: false }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{
              title: "",
              headerRight: HomeButton(navigationRef),
            }}
            name="SenderIntro"
            component={SenderIntroScreen}
          />
          <Stack.Screen
            options={{ title: "", headerRight: HomeButton(navigationRef) }}
            name="RecipientIntro"
            component={RecipientIntroScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions(navigationRef)}
            name="Sender"
            component={SenderContextScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions(navigationRef)}
            name="Recipient"
            component={RecipientContextScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions(navigationRef, "Categories")}
            name="RecipientCategories"
            component={RecipientCategoriesScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions(navigationRef, "Categories")}
            name="SenderCategories"
            component={SenderCategoriesScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions(navigationRef, "Food")}
            name="Food"
            component={FoodScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions(navigationRef, "Fashion")}
            name="Fashion"
            component={FashionScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions(navigationRef, "Music")}
            name="Music"
            component={MusicScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions(navigationRef, "Photography")}
            name="Photography"
            component={PhotographyScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions(navigationRef, "Sport")}
            name="Sport"
            component={SportScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions(navigationRef, "Fragrance")}
            name="Fragrance"
            component={FragranceScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions(navigationRef, "Fragrance")}
            name="Gardening"
            component={GardeningScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions(navigationRef, "Health & Beauty")}
            name="Health & Beauty"
            component={HealthBeautyScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions(navigationRef, "Home Decor")}
            name="Home Decor"
            component={HomeDecorScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions(navigationRef, "Occasions")}
            name="Occasions"
            component={OccasionScreen}
          />
          <Stack.Screen
            options={defaultQuizScreenOptions(navigationRef, "Occasions")}
            name="Budget"
            component={BudgetScreen}
          />
          <Stack.Screen
            options={{ title: "", headerRight: HomeButton(navigationRef) }}
            name="SenderRecommendations"
            component={SenderRecommendationScreen}
          />
          <Stack.Screen
            options={{ title: "", headerRight: HomeButton(navigationRef) }}
            name="RecipientRecommendations"
            component={RecipientRecommendationScreen}
          />
          <Stack.Screen
            options={{ headerRight: HomeButton(navigationRef) }}
            name="Ranking"
            component={RankingScreen}
          />
          <Stack.Screen
            options={{ headerRight: HomeButton(navigationRef) }}
            name="Search"
            component={SearchScreen}
          />
          <Stack.Screen
            options={{ headerRight: HomeButton(navigationRef) }}
            name="Wishlist"
            component={WishlistScreen}
          />
          <Stack.Screen
            options={{ headerRight: HomeButton(navigationRef) }}
            name="CreateProfile"
            component={CreateProfileScreen}
          />
          <Stack.Screen
            options={{ title: "", headerRight: HomeButton(navigationRef) }}
            name="SendEmail"
            component={SendEmailScreen}
          />
          <Stack.Screen
            options={{ title: "", headerRight: HomeButton(navigationRef) }}
            name="Error"
            component={ErrorScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
