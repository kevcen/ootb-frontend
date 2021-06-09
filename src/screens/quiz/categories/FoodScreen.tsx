import React from "react";
import { View, Text, Pressable } from "react-native";
import Question from "../../../components/Question";
import MultipleOptionQuestion from "../../../components/Quiz/MultipleOptionQuestion";
import SingleOptionQuestion from "../../../components/Quiz/SingleOptionQuestion";
import Cuisines from "../../../constants/Cuisines";
import yesNo from "../../../constants/YesNo";
import { buttonStyles } from "../../../styles/buttons";
import { white } from "../../../styles/Colors";
import { styles } from "../../../styles/quiz";

export default function RecipientContextScreen({
  navigation,
}: {
  navigation: any;
}) {
  var doesDrink = false;
  var doesCook = false;
  var chosenCuisines = new Set();

  // TODO: unselect other options after selection
  return (
    <View style={styles.viewCentered}>
      <Question questionText={"Are you of legal age to drink?"} />
      <SingleOptionQuestion
        tagdata={yesNo}
        onTagPress={(tagname) => (doesDrink = tagname == "Yes")}
      />
      <View style={styles.space} />
      <Question questionText={"What are your favorite cuisine?"} />
      <View style={styles.space} />
      <MultipleOptionQuestion
        tagdata={Cuisines}
        onTagPress={(cuisine) => {
          if (chosenCuisines.has(cuisine)) {
            chosenCuisines.delete(cuisine);
          } else {
            chosenCuisines.add(cuisine);
          }
        }}
      />
      <View style={styles.space} />
      <Question questionText={"Do you cook?"} />
      <View style={styles.space} />
      <SingleOptionQuestion
        tagdata={yesNo}
        onTagPress={(tagname) => (doesCook = tagname == "Yes")}
      />
      <View style={styles.space} />
      <Pressable
        onPress={() => {
          navigation.navigate("Categories"); // TODO: change to the name of OccasionScreen
        }}
        style={buttonStyles.blackCenteredFull}
      >
        <Text style={{ color: white }}>Let's go</Text>
      </Pressable>
    </View>
  );
}
