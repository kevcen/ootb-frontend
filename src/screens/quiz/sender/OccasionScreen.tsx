import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Question from "../../../components/Question";
import { buttonStyles } from "../../../styles/buttons";
import { white } from "../../../styles/Colors";
import occasions from "../../../constants/Occasion";
import SingleOptionQuestion from "../../../components/Quiz/SingleOptionQuestion";
import { styles } from "../../../styles/quiz";
import QuizNavigator from "../../../components/Quiz/QuizNavigator";
export default function OccasionScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  var chosenOccasion = "";
  return (
    <View style={styles.viewCentered}>
      <Question questionText={"What is the occasion, if any?"} />
      <View style={styles.space} />
      <SingleOptionQuestion
        tagdata={occasions}
        onTagPress={(tagname) => {
          chosenOccasion = tagname;
        }}
      />
      <View style={styles.space} />
      <QuizNavigator
        navigation={navigation}
        prev={{ pagename: "Sender" }}
        next={{ pagename: "SenderCategories", params: { chosenOccasion } }}
        pagenum={route.params.pagenum}
        totalpages={route.params.totalpages}
      />
    </View>
  );
}
