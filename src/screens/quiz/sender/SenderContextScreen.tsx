import * as React from "react";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import Question from "../../../components/Question";
import genders from "../../../constants/Genders";
import giftTypes from "../../../constants/GiftTypes";
import { buttonStyles } from "../../../styles/buttons";
import { black, green, white } from "../../../styles/Colors";
import axios from "axios";
import { useState } from "react";
import { Icon } from "react-native-elements";
import LoadingData from "../../../components/LoadingData";
import { styles } from "../../../styles/quiz";
import { genButton } from "../../../classes/GeneratingFunctions";
import SingleOptionQuestion from "../../../components/Quiz/SingleOptionQuestion";
import MultipleOptionQuestion from "../../../components/Quiz/MultipleOptionQuestion";

export default function RecipientContextScreen({
  navigation,
}: {
  navigation: any;
}) {
  var gender = "";
  var chosenGiftTypes = new Set();

  // TODO: unselect other options after selection
  return (
    <View style={styles.viewCentered}>
      <Question questionText={"What gender do you identify with?"} />
      <View style={styles.space} />
      <SingleOptionQuestion
        tagdata={genders}
        onTagPress={(tagname) => (gender = tagname)}
      />

      <View style={styles.space} />

      <Question questionText={"What gifts would you prefer to receive?"} />
      <View style={styles.space} />
      <MultipleOptionQuestion
        tagdata={giftTypes}
        onTagPress={(tagname) => {
          if (chosenGiftTypes.has(tagname)) {
            chosenGiftTypes.delete(tagname);
          } else {
            chosenGiftTypes.add(tagname);
          }
        }}
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
