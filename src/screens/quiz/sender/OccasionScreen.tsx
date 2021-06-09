import * as React from "react";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import Question from "../../../components/Question";
import { buttonStyles } from "../../../styles/buttons";
import { black, green, white } from "../../../styles/Colors";
import { useState } from "react";
import occasions from "../../../constants/Occasion";
import MultipleOptionQuestion from "../../../components/Quiz/MultipleOptionQuestion";
import SingleOptionQuestion from "../../../components/Quiz/SingleOptionQuestion";

export default function OccasionScreen({
  navigation,
}: {
  route: Map<string, string>;
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
          navigation.navigate("Categories");
        }}
        style={buttonStyles.blackCenteredFull}
      >
        <Text style={{ color: white }}>Let's go</Text>
      </Pressable>
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
  tag: {
    height: 40,
    marginVertical: 5,
    marginHorizontal: 3,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.4,
  },
  tagChosen: {
    height: 40,
    marginVertical: 5,
    marginHorizontal: 3,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
  },
});
