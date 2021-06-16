import React, {useRef, useState} from "react";
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
  var [doesDrink, setDoesDrink] = useState(true);
  var [doesCook, setDoesCook] = useState(true);
  var chosenCuisines = useRef(new Set());
  var chosenDietaryRequirements = useRef(new Set());
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
          onTagPress={(tagname) => {
            console.log(tagname);
            (setDoesDrink(tagname == "Yes"));
            console.log(doesDrink);
          }}
        />
        <Question questionText={"What are your favorite cuisine?"} />
        <View style={styles.space} />
        <MultipleOptionQuestion
          tagdata={cuis}
          onTagPress={(cuisine) => {
            if (chosenCuisines.current.has(cuisine)) {
              chosenCuisines.current.delete(cuisine);
            } else {
              chosenCuisines.current.add(cuisine);
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
          onTagPress={(tagname) => (setDoesCook(tagname == "Yes"))}
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
            if (chosenDietaryRequirements.current.has(dietaryRequirements)) {
              chosenDietaryRequirements.current.delete(dietaryRequirements);
            } else {
              chosenDietaryRequirements.current.add(dietaryRequirements);
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
            doesCook: doesCook,
            doesDrink: doesDrink,
            chosenCuisines: chosenCuisines.current,
            chosenDietaryRequirements: chosenDietaryRequirements.current,
          },
        }}
        pagenum={route.params.pagenum}
        totalpages={route.params.totalpages}
      />
    </View>
  );
}
