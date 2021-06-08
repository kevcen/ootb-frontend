import * as React from "react";
import { View, Text, Pressable } from "react-native";
import Question from "../../../components/Question";
import { buttonStyles } from "../../../styles/buttons";
import { white } from "../../../styles/Colors";
import axios from "axios";
import { useState } from "react";
import LoadingData from "../../../components/LoadingData";
import { genCategories, genButton } from "../../../classes/GeneratingFunctions"
import { styles } from "../../../styles/quiz"

function getRandomColor(): string {
  var color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
  return color;
}

export default function CategoriesScreen({ navigation }: { navigation: any }) {
  const [chosenCategories, setChosenCategories] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);

  let onTagPress = (title: string) => {
    // toggle chosen category
    if (chosenCategories.has(title)) {
      chosenCategories.delete(title);
    } else {
      chosenCategories.add(title);
    }
  };

  return (
    <View style={styles.viewCentered}>
      <Question questionText={"Which categories would interest them"} />
      <View style={styles.space} />
      <View style={styles.list}>
        {genCategories().map((data) => genButton({ ...data, onPress: onTagPress }))}
      </View>
      <View style={styles.space} />
      {isLoading ? (
        <LoadingData />
      ) : (
        <Pressable
          style={buttonStyles.blackCenteredFull}
          onPress={() => {
            setIsLoading(true);
            setTimeout(
              () =>
                axios
                  .post("https://gift-recommender-api.herokuapp.com/products", {
                    categories: Array.from(chosenCategories),
                  })
                  .then((response) => {
                    navigation.navigate("Recommendations", {
                      recommendations: response.data,
                    });
                  })
                  .catch((error) => {
                    navigation.navigate("Error", { error });
                  })
                  .finally(() => {
                    setIsLoading(false);
                  }),
              1000
            );
          }}
        >
          <Text style={{ color: white }}>Let's go</Text>
        </Pressable>
      )}
    </View>
  );
}