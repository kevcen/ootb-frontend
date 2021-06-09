import React, { useRef, useState } from "react";
import {  View, Text, Pressable } from "react-native";
import Question from "../../../components/Question";
import { buttonStyles } from "../../../styles/buttons";
import {  white } from "../../../styles/Colors";
import axios from "axios";
import LoadingData from "../../../components/LoadingData";
import { styles } from "../../../styles/quiz";
import MultipleOptionQuestion from "../../../components/Quiz/MultipleOptionQuestion";
import Categories from "../../../constants/Categories";

export default function CategoriesScreen({ navigation }: { navigation: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const chosenCategories = useRef(new Set());

  if (isLoading) {
    return <LoadingData />;
  }

  return (
    <View style={styles.viewCentered}>
      <Question questionText={"Which categories would interest them"} />
      <View style={styles.space} />
      <MultipleOptionQuestion
        tagdata={Categories}
        onTagPress={(tagname) => {
          if (chosenCategories.current.has(tagname)) {
            chosenCategories.current.delete(tagname);
          } else {
            chosenCategories.current.add(tagname);
          }
        }}
      />
      <View style={styles.space} />
      <Pressable
        style={buttonStyles.blackCenteredFull}
        onPress={() => {
          setIsLoading(true);
          var promise = axios.post(
            "https://gift-recommender-api.herokuapp.com/products",
            {
              categories: Array.from(chosenCategories.current),
            }
          );
          setTimeout(
            () =>
              promise
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
            500
          );
        }}
      >
        <Text style={{ color: white }}>Let's go</Text>
      </Pressable>
    </View>
  );
}
