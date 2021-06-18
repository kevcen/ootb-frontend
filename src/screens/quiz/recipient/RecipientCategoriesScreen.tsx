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
import PrimaryText from "../../../components/PrimaryText";
import PrimaryButton from "../../../components/PrimaryButton";
import AddNewButton from "../../../components/Quiz/AddNewButton";
import TagData from "../../../interfaces/TagData";

export default function CategoriesScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [chosenCategories] = useState(new Set<string>());
  var [cats, setCats] = useState(Categories.slice());
  const [arrayCategories, setChosenCategories] = useState(new Array());
  const [initialPageNum] = useState(route.params.pagenum);

  return (
    <View style={styles.viewCentered}>
      <Question questionText={"Which categories interest you?"} />
      <Text style={styles.subtext}>Each category that you choose will help use discover more about you. This means you may potentially be asked more questions</Text>
      <View style={styles.space} />
      <MultipleOptionQuestion
        tagdata={cats}
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
      <AddNewButton
        setCats={(cat: TagData) => {
          setCats(cats.concat(cat));
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
          pagename: arrayCategories[0] || "RecipientRecommendations",
          params: {
            chosenCategories,
            prevpage: "",
            nextpageindex: 1,
            nextpages: arrayCategories,
            categories: chosenCategories,
          },
        }}
        pagenum={route.params.pagenum}
        totalpages={initialPageNum + chosenCategories.size}
      />
    </View>
  );
}
