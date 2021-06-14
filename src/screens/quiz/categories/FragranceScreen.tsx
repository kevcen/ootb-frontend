import React, {useRef, useState} from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import Question from "../../../components/Question";
import MultipleOptionQuestion from "../../../components/Quiz/MultipleOptionQuestion";
import QuizNavigator from "../../../components/Quiz/QuizNavigator";
import SingleOptionQuestion from "../../../components/Quiz/SingleOptionQuestion";
import PerfumeTypes from "../../../constants/PerfumeTypes";
import DietaryRequirements from "../../../constants/DietaryRequirements";
import yesNo from "../../../constants/YesNo";
import { styles } from "../../../styles/quiz";
import fragranceFamilies from "../../../constants/FragranceFamilies";

export default function RecipientContextScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const chosenPerfumeTypes = useRef(new Set());
  const chosenFragranceFamilies = useRef(new Set());

  return (
    <View style={styles.viewCentered}>
      <ScrollView
        style={styles.scrollable}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Question questionText={"What are your favourite perfume types?"} />
        <View style={styles.space} />
        <MultipleOptionQuestion
          tagdata={PerfumeTypes}
          onTagPress={(type) => {
            if (chosenPerfumeTypes.current.has(type)) {
              chosenPerfumeTypes.current.delete(type);
            } else {
              chosenPerfumeTypes.current.add(type);
            }
          }}
        />
        <View style={styles.space} />
        <Question
          questionText={"What are your favourite fragrance families?"}
        />
        <View style={styles.space} />
        <MultipleOptionQuestion
          tagdata={fragranceFamilies}
          onTagPress={(family) => {
            if (chosenFragranceFamilies.current.has(family)) {
              chosenFragranceFamilies.current.delete(family);
            } else {
              chosenFragranceFamilies.current.add(family);
            }
          }}
        />
        <View style={styles.space} />
      </ScrollView>
      <QuizNavigator
        currentpage={{
          pagename: "Fragrance",
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
            chosenPerfumeTypes : chosenPerfumeTypes.current,
            chosenFragranceFamilies : chosenFragranceFamilies.current,
          },
        }}
        pagenum={route.params.pagenum}
        totalpages={route.params.totalpages}
      />
    </View>
  );
}
