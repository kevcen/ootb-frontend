import * as React from "react";
import { View, Text, Pressable } from "react-native";
import Question from "../../../components/Question";
import Genders from "../../../constants/Genders";
import GiftTypes from "../../../constants/GiftTypes";
import { buttonStyles } from "../../../styles/buttons";
import { white } from "../../../styles/Colors";
import { styles } from "../../../styles/quiz";
import SingleOptionQuestion from "../../../components/Quiz/SingleOptionQuestion";
import QuizNavigator from "../../../components/Quiz/QuizNavigator";
import { useState } from "react";

export default function RecipientContextScreen({
  navigation,
}: {
  navigation: any;
}) {
  const [chosenGender, setChosenGender] = useState("");
  const [chosenGiftType, setChosenGiftType] = useState("");

  // TODO: unselect other options after selection
  return (
    <View style={styles.viewCentered}>
      <Question questionText={"What gender do you identify with?"} />
      <View style={styles.space} />
      <SingleOptionQuestion tagdata={Genders} onTagPress={setChosenGender} />

      <View style={styles.space} />

      <Question questionText={"What gifts would you prefer to receive?"} />
      <View style={styles.space} />
      <SingleOptionQuestion
        tagdata={GiftTypes}
        onTagPress={setChosenGiftType}
      />
      <View style={styles.space} />
      <QuizNavigator
        navigation={navigation}
        prev={{pagename:"RecipientIntro"}}
        currentpage={
          {
            pagename:"Recipient",
          }
        }
        next={{
          pagename:
            "RecipientCategories",
          params: { chosenGender, chosenGiftType },
        }}
        pagenum={1}
        totalpages={2}
      />
    </View>
  );
}
