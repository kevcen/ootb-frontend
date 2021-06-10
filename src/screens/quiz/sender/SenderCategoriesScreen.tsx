import React, { useRef, useState } from "react";
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
import AddNewButton from "../../../components/Quiz/AddNewButton";
import TagData from "../../../interfaces/TagData";

export default function CategoriesScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const chosenCategories = new Set();
  var [cats, setCats] = useState(Categories.slice());

  return (
    <View style={styles.viewCentered}>
      <Question questionText={"Which categories would interest them"} />
      <View style={styles.space} />
      <MultipleOptionQuestion
        tagdata={cats}
        onTagPress={(tagname) => {
          if (chosenCategories.has(tagname)) {
            chosenCategories.delete(tagname);
          } else {
            chosenCategories.add(tagname);
          }
        }}
      />
      <View style={styles.space} />
      <AddNewButton
        setCats={(cat: TagData) => {
          setCats(cats.concat(cat));
        }}
      />
      <View style={styles.space} />
      <QuizNavigator
        navigation={navigation}
        prev={{ pagename: "Occasions" }}
        next={{
          pagename: "Budget",
          params: {
            categories: chosenCategories,
            isSender: true,
            ...route.params,
          },
        }}
        pagenum={route.params.pagenum}
        totalpages={route.params.totalpages}
      />
    </View>
  );
}
