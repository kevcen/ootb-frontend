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
import { styles } from "../../../styles/quiz"
import { genButton } from "../../../classes/GeneratingFunctions"

let genGenders = (): any[] => {
  var data = new Array();
  genders.forEach((genderName, index) => {
    data.push({ key: "cat_" + index, title: genderName, subtitle: "" });
  });
  return data;
};

let genGiftTypes = (): any[] => {
  var data = new Array();
  giftTypes.forEach((giftType, index) => {
    data.push({ key: "cat_" + index, title: giftType[0], subtitle: giftType[1] });
  });
  return data;
};

export default function RecipientContextScreen({ navigation }: { navigation: any }) {
  const [isLoading, setIsLoading] = useState(false);

  var gender = "";
  var relationships = "";

  // TODO: unselect other options after selection
  return (
    <View style={styles.viewCentered}>
      <Question questionText={"What gender do you identify with?"} />
      <View style={styles.space} />
      <View style={styles.list}>
        {genGenders().map((data) => genButton({ ...data, onPress: () => gender = data.title }))}
      </View>
      <View style={styles.space} />
      <Question questionText={"What gifts would you prefer to receive?"} />
      <View style={styles.space} />
      <View style={styles.list}>
        {genGiftTypes().map((data) => genButton({ ...data, onPress: () => relationships = data.title  }))}
      </View>
      <View style={styles.space} />
      <Pressable
        onPress={() => {
          navigation.navigate("Categories"); // TODO: change to the name of OccasionScreen
        }}
        style={buttonStyles.blackCenteredFull}
      >
        <Text style={{color:white}}>Let's go</Text>
      </Pressable>
    </View>
  );
}
