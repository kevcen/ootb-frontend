import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import Question from "../../../components/Question";
import { buttonStyles } from "../../../styles/buttons";
import { white } from "../../../styles/Colors";
import { useState } from "react";
import SingleOptionQuestion from "../../../components/Quiz/SingleOptionQuestion";
import Genders from "../../../constants/Genders";
import Relationships from "../../../constants/Relationships";

export default function RecipientContextScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [isLoading, setIsLoading] = useState(false);

  var gender = "";
  var relationship = "";

  // TODO: unselect other options after selection
  return (
    <View style={styles.viewCentered}>
      <Question
        questionText={"What gender does the recipient identify with?"}
      />
      <View style={styles.space} />
      <SingleOptionQuestion tagdata={Genders} onTagPress={(name) => (gender = name)}/>
      <View style={styles.space} />
      <Question
        questionText={
          "What best describes your relationship with the recipient?"
        }
      />
      <View style={styles.space} />
      <SingleOptionQuestion tagdata={Relationships} onTagPress={(name) => (relationship = name)}/>
      <View style={styles.space} />
      <Pressable
        onPress={() => {
          navigation.navigate("Occasions", {gender,relationship});
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
});
