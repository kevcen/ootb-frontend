import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import Question from "../../../components/Question";
import MultipleOptionQuestion from "../../../components/Quiz/MultipleOptionQuestion";
import QuizNavigator from "../../../components/Quiz/QuizNavigator";
import SingleOptionQuestion from "../../../components/Quiz/SingleOptionQuestion";
import PlantTypes from "../../../constants/PlantTypes";
import PlantSize from "../../../constants/PlantSizes";
import yesNo from "../../../constants/YesNo";
import { styles } from "../../../styles/quiz";

export default function RecipientContextScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  var hasGreenhouse = false;
  var chosenPlantTypes = new Set();
  var chosenPlantSizes = new Set();

  // TODO: unselect other options after selection
  return (
    <View style={styles.viewCentered}>
      <ScrollView
        style={styles.scrollable}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Question questionText={"Do you have a greenhouse?"} />
        <View style={styles.space} />
        <SingleOptionQuestion
          tagdata={yesNo}
          onTagPress={(tagname) => (hasGreenhouse = tagname == "Yes")}
        />
        <Question questionText={"What's your favourite type of plant?"} />
        <View style={styles.space} />
        <MultipleOptionQuestion
          tagdata={PlantTypes}
          onTagPress={(plantType) => {
            if (chosenPlantTypes.has(plantType)) {
              chosenPlantTypes.delete(plantType);
            } else {
              chosenPlantTypes.add(plantType);
            }
          }}
        />
        <Question questionText={"How much space do you have to plant?"} />
        <View style={styles.space} />
        <MultipleOptionQuestion
          tagdata={PlantSize}
          onTagPress={(plantSize) => {
            if (chosenPlantSizes.has(plantSize)) {
              chosenPlantSizes.delete(plantSize);
            } else {
              chosenPlantSizes.add(plantSize);
            }
          }}
        />
        <View style={styles.space} />
      </ScrollView>
      <QuizNavigator
        currentpage={{
          pagename: "Gardening",
          params: { ...route.params },
        }}
        navigation={navigation}
        prev={{
          pagename: route.params.nextpages[route.params.nextpageindex - 2] || "RecipientCategories",
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
            hasGreenhouse,
            chosenPlantSizes,
            chosenPlantTypes,
          },
        }}
        pagenum={route.params.pagenum}
        totalpages={route.params.totalpages}
      />
    </View>
  );
}
