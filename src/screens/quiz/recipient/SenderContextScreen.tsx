import * as React from "react";
import { View, Text, Pressable } from "react-native";
import Question from "../../../components/Question";
import { buttonStyles } from "../../../styles/buttons";
import { white } from "../../../styles/Colors";
import { useState } from "react";
import { styles } from "../../../styles/quiz"
import { genGenders, genGiftTypes, genButton } from "../../../classes/GeneratingFunctions"

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
          navigation.navigate("RecipientCategories"); // TODO: change to the name of OccasionScreen
        }}
        style={buttonStyles.blackCenteredFull}
      >
        <Text style={{color:white}}>Let's go</Text>
      </Pressable>
    </View>
  );
}
