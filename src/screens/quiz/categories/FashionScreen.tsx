import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import Question from "../../../components/Question";
import MultipleOptionQuestion from "../../../components/Quiz/MultipleOptionQuestion";
import QuizNavigator from "../../../components/Quiz/QuizNavigator";
import SingleOptionQuestion from "../../../components/Quiz/SingleOptionQuestion";
import FashionWear from "../../../constants/FashionWear";
import ClothesStoreTypes from "../../../constants/ClothesStoreTypes";
import ClothingSeasons from "../../../constants/ClothingSeasons";
import yesNo from "../../../constants/YesNo";
import { styles } from "../../../styles/quiz";

export default function RecipientContextScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  var chosenClothesStoreTypes = new Set();
  var chosenClothingSeasons = new Set();
  var chosenFashionWear = new Set();

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
        <View style={styles.space} />
        <Question questionText={"What season is it?"} />
        <View style={styles.space} />
        <MultipleOptionQuestion
          tagdata={ClothingSeasons}
          onTagPress={(season) => {
            if (chosenClothingSeasons.has(season)) {
              chosenClothingSeasons.delete(season);
            } else {
              chosenClothingSeasons.add(season);
            }
          }}
        />
        <View style={styles.space} />
        <Question questionText={"What type of wear do you like to wear?"} />
        <View style={styles.space} />
        <MultipleOptionQuestion
          tagdata={FashionWear}
          onTagPress={(wear) => {
            if (chosenFashionWear.has(wear)) {
              chosenFashionWear.delete(wear);
            } else {
              chosenFashionWear.add(wear);
            }
          }}
        />
        <View style={styles.space} />
        <Question questionText={"Where do you usually shop?"} />
        <View style={styles.space} />
        <MultipleOptionQuestion
          tagdata={ClothesStoreTypes}
          onTagPress={(store) => {
            if (chosenClothesStoreTypes.has(store)) {
              chosenClothesStoreTypes.delete(store);
            } else {
              chosenClothesStoreTypes.add(store);
            }
          }}
        />
        <View style={styles.space} />
      </ScrollView>
      <QuizNavigator
        currentpage={{
          pagename: "Fashion",
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
            chosenClothesStoreTypes,
            chosenClothingSeasons,
            chosenFashionWear,
          },
        }}
        pagenum={route.params.pagenum}
        totalpages={route.params.totalpages}
      />
    </View>
  );
}
