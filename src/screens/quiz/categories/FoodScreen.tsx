import * as React from "react";
import { View, Text, Pressable } from "react-native";
import Question from "../../../components/Question";
import { buttonStyles } from "../../../styles/buttons";
import { white } from "../../../styles/Colors";
import { useState } from "react";
import { styles } from "../../../styles/quiz"
import { genCuisines, genYesNo, genButton } from "../../../classes/GeneratingFunctions"

export default function RecipientContextScreen({ navigation }: { navigation: any }) {
  const [isLoading, setIsLoading] = useState(false);

  var drink = false;
  var cook = false;
  var cuisines = new Set();

  let addCuisine = (cuisine: string) => {
    if (cuisines.has(cuisine)) {
      cuisines.delete(cuisine);
    } else {
      cuisines.add(cuisine);
    }
  } 

  // TODO: unselect other options after selection
  return (
    <View style={styles.viewCentered}>
      <Question questionText={"Are you of legal age to drink?"} />
      <View style={styles.list}>
        {genYesNo().map((data) => genButton({ ...data, onPress: () => drink = data.title == "Yes" ? true : false }))}
      </View>
      <View style={styles.space} />
      <Question questionText={"What is your favorite cuisine?"} />
      <View style={styles.space} />
      <View style={styles.list}>
        {genCuisines().map((data) => genButton({ ...data, onPress: () => addCuisine(data)}))}
      </View>      <View style={styles.space} />
      <Question questionText={"Do you cook?"} />
      <View style={styles.space} />
      <View style={styles.list}>
        {genYesNo().map((data) => genButton({ ...data, onPress: () => cook = data.title == "Yes" ? true : false }))}
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
