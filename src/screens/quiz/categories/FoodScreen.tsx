import React, {useState} from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import Question from "../../../components/Question";
import MultipleOptionQuestion from "../../../components/Quiz/MultipleOptionQuestion";
import QuizNavigator from "../../../components/Quiz/QuizNavigator";
import SingleOptionQuestion from "../../../components/Quiz/SingleOptionQuestion";
import Cuisines from "../../../constants/Cuisines";
import DietaryRequirements from "../../../constants/DietaryRequirements";
import yesNo from "../../../constants/YesNo";
import AddNewButton from "../../../components/Quiz/AddNewButton";
import { styles } from "../../../styles/quiz";
import TagData from "../../../interfaces/TagData";

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
  var chosenDietaryRequirements = new Set();
  var [cuis, setCuis] = useState(Cuisines.slice());
  

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
        <Question questionText={"Are you of legal age to drink?"} />
        <View style={styles.space} />
        <SingleOptionQuestion
          tagdata={yesNo}
          onTagPress={(tagname) => (doesDrink = tagname == "Yes")}
        />
        <Question questionText={"What are your favorite cuisine?"} />
        <View style={styles.space} />
        <MultipleOptionQuestion
          tagdata={cuis}
          onTagPress={(cuisine) => {
            if (chosenCuisines.has(cuisine)) {
              chosenCuisines.delete(cuisine);
            } else {
              chosenCuisines.add(cuisine);
            }
          }}
        />
        <View style={styles.space} />
        <AddNewButton
          setCats={(cui: TagData) => {
            setCuis(cuis.concat(cui));
          }}
        />
        <Question questionText={"Do you cook?"} />
        <View style={styles.space} />
        <SingleOptionQuestion
          tagdata={yesNo}
          onTagPress={(tagname) => (doesCook = tagname == "Yes")}
        />

        <Question
          questionText={
            "Do you have any allergies? or special dietary requirements?"
          }
        />
        <View style={styles.space} />
        <MultipleOptionQuestion
          tagdata={DietaryRequirements}
          onTagPress={(dietaryRequirements) => {
            if (chosenDietaryRequirements.has(dietaryRequirements)) {
              chosenDietaryRequirements.delete(dietaryRequirements);
            } else {
              chosenDietaryRequirements.add(dietaryRequirements);
            }
          }}
        />
        <View style={styles.space} />
      </ScrollView>
      <QuizNavigator
        currentpage={{
          pagename: "Food",
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
            doesCook,
            doesDrink,
            chosenCuisines,
            chosenDietaryRequirements,
          },
        }}
        pagenum={route.params.pagenum}
        totalpages={route.params.totalpages}
      />
    </View>
  );
}
