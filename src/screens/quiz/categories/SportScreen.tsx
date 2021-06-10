import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import Question from "../../../components/Question";
import MultipleOptionQuestion from "../../../components/Quiz/MultipleOptionQuestion";
import QuizNavigator from "../../../components/Quiz/QuizNavigator";
import SingleOptionQuestion from "../../../components/Quiz/SingleOptionQuestion";
import Sports from "../../../constants/Sports";
import yesNo from "../../../constants/YesNo";
import { styles } from "../../../styles/quiz";

export default function RecipientContextScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  var chosenPlaySports = new Set();
  var chosenWatchSports = new Set();

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
        <Question questionText={"What sports do you play?"} />
        <View style={styles.space} /** add new*//>
        <MultipleOptionQuestion
          tagdata={Sports}
          onTagPress={(sport) => {
            if (chosenPlaySports.has(sport)) {
              chosenPlaySports.delete(sport);
            } else {
              chosenPlaySports.add(sport);
            }
          }}
        />
        <Question questionText={"What sports do you watch?"} />
        <View style={styles.space} />
        <MultipleOptionQuestion
          tagdata={Sports}
          onTagPress={(sport) => {
            if (chosenWatchSports.has(sport)) {
              chosenWatchSports.delete(sport);
            } else {
              chosenWatchSports.add(sport);
            }
          }}
        />
      </ScrollView>
      <QuizNavigator
        currentpage={{
          pagename: "Sport",
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
            "Recommendations",
          params: {
            nextpageindex: route.params.nextpageindex + 1,
            chosenPlaySports,
            chosenWatchSports,
          },
        }}
        pagenum={route.params.pagenum}
        totalpages={route.params.totalpages}
      />
    </View>
  );
}
