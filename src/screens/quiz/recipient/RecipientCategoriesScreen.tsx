import React, { useEffect, useRef, useState } from "react";
import { View, Text, Pressable } from "react-native";
import Question from "../../../components/Question";
import { buttonStyles } from "../../../styles/buttons";
import { white } from "../../../styles/Colors";
import axios from "axios";
import LoadingData from "../../../components/LoadingData";
import { styles } from "../../../styles/quiz";
import MultipleOptionQuestion from "../../../components/Quiz/MultipleOptionQuestion";
import Categories from "../../../constants/Categories";
import QuizNavigator from "../../../components/Quiz/QuizNavigator";

export default function CategoriesScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [chosenCategories] = useState(new Set<string>());
  const [arrayCategories, setChosenCategories] = useState(new Array());
  const [initialPageNum] = useState(route.params.pagenum);

  return (
    <View style={styles.viewCentered}>
      <Question questionText={"Which categories would interest them"} />
      <View style={styles.space} />
      <MultipleOptionQuestion
        tagdata={Categories}
        onTagPress={(tagname) => {
          if (chosenCategories.has(tagname)) {
            chosenCategories.delete(tagname);
          } else {
            chosenCategories.add(tagname);
          }
          setChosenCategories(Array.from(chosenCategories));
        }}
      />
      <View style={styles.space} />
      <QuizNavigator
        currentpage={{
          pagename: "RecipientCategories",
          params: { ...route.params },
        }}
        navigation={navigation}
        prev={{ pagename: "Recipient" }}
        next={{
          pagename: arrayCategories[0] || "Recommendations",
          params: {
            chosenCategories,
            prevpage: "",
            nextpageindex: 1,
            nextpages: arrayCategories,
          },
        }}
        pagenum={route.params.pagenum}
        totalpages={initialPageNum + chosenCategories.size}
      />
    </View>
  );
}
