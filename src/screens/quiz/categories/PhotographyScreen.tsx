import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import Question from "../../../components/Question";
import MultipleOptionQuestion from "../../../components/Quiz/MultipleOptionQuestion";
import QuizNavigator from "../../../components/Quiz/QuizNavigator";
import SingleOptionQuestion from "../../../components/Quiz/SingleOptionQuestion";
import CameraTypes from "../../../constants/CameraTypes";
import PhotographyExperience from "../../../constants/PhotographyExperience";
import yesNo from "../../../constants/YesNo";
import { styles } from "../../../styles/quiz";

export default function RecipientContextScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  var chosenCameraTypes = new Set();
  var chosenExperience = new Set();

  return (
    <View style={styles.viewCentered}>
      <ScrollView
        style={styles.scrollable}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Question questionText={"How experienced are you with photography?"} />
        <View
          style={styles.space}
          /** TODO: unselect other options after selection*/
        />
        <MultipleOptionQuestion
          tagdata={PhotographyExperience}
          onTagPress={(experience) => {
            if (chosenExperience.has(experience)) {
              chosenExperience.delete(experience);
            } else {
              chosenExperience.add(experience);
            }
          }}
        />
        <Question questionText={"What type of cameras do you like?"} />
        <View style={styles.space} />
        <MultipleOptionQuestion
          tagdata={CameraTypes}
          onTagPress={(type) => {
            if (chosenCameraTypes.has(type)) {
              chosenCameraTypes.delete(type);
            } else {
              chosenCameraTypes.add(type);
            }
          }}
        />
      </ScrollView>
      <QuizNavigator
        currentpage={{
          pagename: "Photography",
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
            chosenCameraTypes,
            chosenExperience,
          },
        }}
        pagenum={route.params.pagenum}
        totalpages={route.params.totalpages}
      />
    </View>
  );
}
