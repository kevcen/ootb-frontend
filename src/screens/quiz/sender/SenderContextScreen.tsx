import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import Question from "../../../components/Question";
import { buttonStyles } from "../../../styles/buttons";
import { white } from "../../../styles/Colors";
import SingleOptionQuestion from "../../../components/Quiz/SingleOptionQuestion";
import Genders from "../../../constants/Genders";
import Relationships from "../../../constants/Relationships";
import QuizNavigator from "../../../components/Quiz/QuizNavigator";

export default function RecipientContextScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  var gender = "";
  var relationship = "";

  return (
    <View style={styles.viewCentered}>
      <Question
        questionText={"What gender does the recipient identify with?"}
      />
      <View style={styles.space} />
      <SingleOptionQuestion
        tagdata={Genders}
        onTagPress={(name) => (gender = name)}
      />
      <View style={styles.space} />
      <Question
        questionText={
          "What best describes your relationship with the recipient?"
        }
      />
      <View style={styles.space} />
      <SingleOptionQuestion
        tagdata={Relationships}
        onTagPress={(name) => (relationship = name)}
      />
      <View style={styles.space} />
      <QuizNavigator
        navigation={navigation}
        prev={{pagename:"SenderIntro"}}
        next={{ pagename: "Occasions", params: { gender: [gender], relationship: new Set(relationship) } }}
        currentpage={{ pagename: "Sender", params: { ...route.params } }}
        pagenum={1}
        totalpages={4}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewCentered: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  space: {
    width: 20,
    height: 20,
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});
