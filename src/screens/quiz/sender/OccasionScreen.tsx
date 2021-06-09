import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Question from "../../../components/Question";
import { buttonStyles } from "../../../styles/buttons";
import { white } from "../../../styles/Colors";
import occasions from "../../../constants/Occasion";
import SingleOptionQuestion from "../../../components/Quiz/SingleOptionQuestion";
import { styles } from "../../../styles/quiz";

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
      <Pressable
        onPress={() => {
          route["params"]["occasion"] = chosenOccasion;
          navigation.navigate("Categories", route);
        }}
        style={buttonStyles.blackCenteredFull}
      >
        <Text style={{ color: white }}>Let's go</Text>
      </Pressable>
    </View>
  );
}
