import React, {useRef, useState} from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import Question from "../../../components/Question";
import MultipleOptionQuestion from "../../../components/Quiz/MultipleOptionQuestion";
import QuizNavigator from "../../../components/Quiz/QuizNavigator";
import SingleOptionQuestion from "../../../components/Quiz/SingleOptionQuestion";
import FashionWear from "../../../constants/FashionWear";
import ClothesStoreTypes from "../../../constants/ClothesStoreTypes";
import ClothingSeasons from "../../../constants/ClothingSeasons";
import yesNo from "../../../constants/YesNo";
import { styles } from "../../../styles/quiz";
import AddNewButton from "../../../components/Quiz/AddNewButton";
import TagData from "../../../interfaces/TagData";

export default function RecipientContextScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const chosenClothesStoreTypes = useRef(new Set());
  const chosenClothingSeasons = useRef(new Set());
  const chosenFashionWear = useRef(new Set());
  const [fashWear, setFashWear] = useState(FashionWear);


  // TODO: unselect other options after selection
  return (
    <View style={styles.viewCentered}>
      <ScrollView
        style={styles.scrollable}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.space} />
        <Question questionText={"Which seasons of wear do you want to be gifted?"} />
        <View style={styles.space} />
        <MultipleOptionQuestion
          tagdata={ClothingSeasons}
          onTagPress={(clothingSeason) => {
            if (chosenClothingSeasons.current.has(clothingSeason)) {
              chosenClothingSeasons.current.delete(clothingSeason);
            } else {
              chosenClothingSeasons.current.add(clothingSeason);
            }
          }}
        />
        <View style={styles.space} />
        <Question questionText={"What type of clothes do you like to wear?"} />
        <View style={styles.space} />
        <MultipleOptionQuestion
          tagdata={fashWear}
          onTagPress={(wear) => {
            if (chosenFashionWear.current.has(wear)) {
              chosenFashionWear.current.delete(wear);
            } else {
              chosenFashionWear.current.add(wear);
            }
          }}
        />
        <View style={styles.space} />
        <AddNewButton
          setCats={(wear: TagData) => {
            setFashWear(fashWear.concat(wear));
          }}
        />
        <View style={styles.space} />
        <Question questionText={"Where do you usually shop?"} />
        <View style={styles.space} />
        <MultipleOptionQuestion
          tagdata={ClothesStoreTypes}
          onTagPress={(store) => {
            if (chosenClothesStoreTypes.current.has(store)) {
              chosenClothesStoreTypes.current.delete(store);
            } else {
              chosenClothesStoreTypes.current.add(store);
            }
          }}
        />
        <View style={styles.space} />
      </ScrollView>
      <QuizNavigator
        currentpage={{
          pagename: "Fashion",
          params: { ...route.params },
        }}
        navigation={navigation}
        prev={{
          pagename: route.params.nextpages[route.params.nextpageindex - 2] || "RecipientCategories",
          params: {
            nextpageindex: route.params.nextpageindex - 1,
          },
        }}
        next={{
          pagename:
            route.params.nextpages[route.params.nextpageindex] ||
            "RecipientRecommendations",
          params: {
            nextpageindex: route.params.nextpageindex + 1,
            chosenClothesStoreTypes : chosenClothesStoreTypes.current,
            chosenClothingSeasons : chosenClothingSeasons.current,
            chosenFashionWear : chosenFashionWear.current,
          },
        }}
        pagenum={route.params.pagenum}
        totalpages={route.params.totalpages}
      />
    </View>
  );
}
