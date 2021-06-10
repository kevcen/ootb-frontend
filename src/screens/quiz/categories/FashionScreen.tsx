import React from "react";
import { View, Text, Pressable } from "react-native";
import Question from "../../../components/Question";
import MultipleOptionQuestion from "../../../components/Quiz/MultipleOptionQuestion";
import QuizNavigator from "../../../components/Quiz/QuizNavigator";
import SingleOptionQuestion from "../../../components/Quiz/SingleOptionQuestion";
import Cuisines from "../../../constants/Cuisines";
import yesNo from "../../../constants/YesNo";
import { styles } from "../../../styles/quiz";

export default function RecipientContextScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  var doesDrink = false;
  var doesCook = false;
  var chosenCuisines = new Set();

  // TODO: unselect other options after selection
  return (
    <View style={styles.viewCentered}>
      <View style={styles.space} />
      <Question questionText={"Are you of legal age to drink?"} />
      <View style={styles.space} />
      <SingleOptionQuestion
        tagdata={yesNo}
        onTagPress={(tagname) => (doesDrink = tagname == "Yes")}
      />
      <View style={styles.space} />
      <Question questionText={"What are your favorite cuisine?"} />
      <View style={styles.space} />
      <MultipleOptionQuestion
        tagdata={Cuisines}
        onTagPress={(cuisine) => {
          if (chosenCuisines.has(cuisine)) {
            chosenCuisines.delete(cuisine);
          } else {
            chosenCuisines.add(cuisine);
          }
        }}
      />
      <View style={styles.space} />
      <Question questionText={"Do you cook?"} />
      <View style={styles.space} />
      <SingleOptionQuestion
        tagdata={yesNo}
        onTagPress={(tagname) => (doesCook = tagname == "Yes")}
      />
      <View style={styles.space} />
      <QuizNavigator
        currentpage={{
          pagename: "Food",
          params: { ...route.params },
        }}
        navigation={navigation}
        prev={{
          pagename: route.params.prevpage || "RecipientCategories",
          params: {
            nextpageindex: route.params.nextpageindex - 1,
          },
        }}
        next={{
          pagename:
            route.params.nextpages[route.params.nextpageindex] ||
            "RecipientRecommendations",
          params: {
            nextpageindex: route.params.nextpageindex + 1,
            doesCook,
            doesDrink,
            chosenCuisines,
          },
        }}
        pagenum={route.params.pagenum}
        totalpages={route.params.totalpages}
      />
    </View>
  );
}
