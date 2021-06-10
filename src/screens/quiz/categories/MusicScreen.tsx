import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import Question from "../../../components/Question";
import MultipleOptionQuestion from "../../../components/Quiz/MultipleOptionQuestion";
import QuizNavigator from "../../../components/Quiz/QuizNavigator";
import SingleOptionQuestion from "../../../components/Quiz/SingleOptionQuestion";
import Instruments from "../../../constants/Instruments";
import Genres from "../../../constants/Genres";
import yesNo from "../../../constants/YesNo";
import { styles } from "../../../styles/quiz";

export default function RecipientContextScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  var chosenInstruments = new Set();
  var chosenGenres = new Set();

  // TODO: ADD NEWs
  return (
    <View style={styles.viewCentered}>
      <ScrollView
        style={styles.scrollable}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Question questionText={"What instruments do you play?"} />
        <View style={styles.space} />
        <MultipleOptionQuestion
          tagdata={Instruments}
          onTagPress={(instrument) => {
            if (chosenInstruments.has(instrument)) {
              chosenInstruments.delete(instrument);
            } else {
              chosenInstruments.add(instrument);
            }
          }}
        />
        <View style={styles.space} />
        <Question questionText={"What genres of music do you like?"} />
        <View style={styles.space} />
        <MultipleOptionQuestion
          tagdata={Genres}
          onTagPress={(genre) => {
            if (chosenGenres.has(genre)) {
              chosenGenres.delete(genre);
            } else {
              chosenGenres.add(genre);
            }
          }}
        />
        <View style={styles.space} />
      </ScrollView>
      <QuizNavigator
        currentpage={{
          pagename: "Music",
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
            chosenGenres,
            chosenInstruments,
          },
        }}
        pagenum={route.params.pagenum}
        totalpages={route.params.totalpages}
      />
    </View>
  );
}
