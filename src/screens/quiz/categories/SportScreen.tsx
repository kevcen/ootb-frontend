import React, {useRef, useState} from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import Question from "../../../components/Question";
import MultipleOptionQuestion from "../../../components/Quiz/MultipleOptionQuestion";
import QuizNavigator from "../../../components/Quiz/QuizNavigator";
import SingleOptionQuestion from "../../../components/Quiz/SingleOptionQuestion";
import Sports from "../../../constants/Sports";
import yesNo from "../../../constants/YesNo";
import { styles } from "../../../styles/quiz";
import AddNewButton from "../../../components/Quiz/AddNewButton";
import TagData from "../../../interfaces/TagData";

export default function RecipientContextScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  var chosenPlaySports = useRef(new Set());
  var chosenWatchSports = useRef(new Set());
  var [sports, setSports] = useState(Sports.slice());

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
        <View style={styles.space} /** add new*/ />
        <MultipleOptionQuestion
          tagdata={sports}
          onTagPress={(sport) => {
            if (chosenPlaySports.current.has(sport)) {
              chosenPlaySports.current.delete(sport);
            } else {
              chosenPlaySports.current.add(sport);
            }
          }}
        />
        <View style={styles.space} />
        <AddNewButton
          setCats={(sport: TagData) => {
            setSports(sports.concat(sport));
          }}
        />
        <Question questionText={"What sports do you watch?"} />
        <View style={styles.space} />
        <MultipleOptionQuestion
          tagdata={sports}
          onTagPress={(sport) => {
            if (chosenWatchSports.current.has(sport)) {
              chosenWatchSports.current.delete(sport);
            } else {
              chosenWatchSports.current.add(sport);
            }
          }}
        />
        <View style={styles.space} />
        <AddNewButton
          setCats={(sport: TagData) => {
            setSports(sports.concat(sport));
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
            chosenPlaySports: chosenPlaySports.current,
            chosenWatchSports: chosenWatchSports.current,
          },
        }}
        pagenum={route.params.pagenum}
        totalpages={route.params.totalpages}
      />
    </View>
  );
}
