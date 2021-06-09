import * as React from "react";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import Question from "../../../components/Question";
import genders from "../../../constants/Genders";
import relationships from "../../../constants/Relationships";
import { buttonStyles } from "../../../styles/buttons";
import { black, green, white } from "../../../styles/Colors";
import axios from "axios";
import { useState } from "react";
import { Icon } from "react-native-elements";
import LoadingData from "../../../components/LoadingData";
import SelectableTag from "../../../components/Quiz/SelectableTag";
import SingleOptionQuestion from "../../../components/Quiz/SingleOptionQuestion";

let genGenders = (): any[] => {
  var data = new Array();
  genders.forEach((genderName, index) => {
    data.push({ key: "cat_" + index, title: genderName });
  });
  return data;
};

let genRelationships = (): any[] => {
  var data = new Array();
  relationships.forEach((relationshipName, index) => {
    data.push({ key: "cat_" + index, title: relationshipName });
  });
  return data;
};

export default function RecipientContextScreen({
  navigation,
}: {
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
      <SingleOptionQuestion tagdata={genders} onTagPress={(name) => (gender = name)}/>
      <View style={styles.space} />
      <Question
        questionText={
          "What best describes your relationship with the recipient?"
        }
      />
      <View style={styles.space} />
      <SingleOptionQuestion tagdata={relationships} onTagPress={(name) => (relationship = name)}/>
      <View style={styles.space} />
      <Pressable
        onPress={() => {
          navigation.navigate("Occasions");
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
