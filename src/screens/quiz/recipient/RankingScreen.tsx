import React from "react";
import { View, Text, Pressable } from "react-native";
import Question from "../../../components/Question";
import MultipleOptionQuestion from "../../../components/Quiz/MultipleOptionQuestion";
import QuizNavigator from "../../../components/Quiz/QuizNavigator";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { styles } from "../../../styles/quiz";

export default function RankingScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const selectedItems = route.params?.wishlist;

  return (
    <View style={styles.viewCentered}>
      <View style={styles.space} />
      <Question questionText={"Rank your wishlist"} />
      <View style={styles.space} />
      <Question
        questionText={
          "Drag and drop the items from most wanted (TOP) to least wanted (BOTTOM)"
        }
      />
      <View style={styles.space} />
      <DraggableFlatList
        data={data}
        renderItem={
      <View style={styles.space} />
      <QuizNavigator
        currentpage={{
          pagename: "Food",
          params: { ...route.params },
        }}
        navigation={navigation}
        prev={{
          pagename: route.params.prevpage || "RecipientCategories",
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
          },
        }}
        pagenum={route.params.pagenum}
        totalpages={route.params.totalpages}
      />
    </View>
  );
}
