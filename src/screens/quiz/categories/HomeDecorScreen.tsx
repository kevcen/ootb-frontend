import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import Question from "../../../components/Question";
import MultipleOptionQuestion from "../../../components/Quiz/MultipleOptionQuestion";
import QuizNavigator from "../../../components/Quiz/QuizNavigator";
import SingleOptionQuestion from "../../../components/Quiz/SingleOptionQuestion";
import HomeRooms from "../../../constants/HomeRooms";
import HomeStyles from "../../../constants/HomeStyles";
import yesNo from "../../../constants/YesNo";
import { styles } from "../../../styles/quiz";

export default function RecipientContextScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  var chosenHomeRooms = new Set();
  var chosenHomeStyles = new Set();

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
        <Question questionText={"Which room do you want gifts for?"} />
        <View style={styles.space} />
        <MultipleOptionQuestion
          tagdata={HomeStyles}
          onTagPress={(homeStyle) => {
            if (chosenHomeStyles.has(homeStyle)) {
              chosenHomeStyles.delete(homeStyle);
            } else {
              chosenHomeStyles.add(homeStyle);
            }
          }}
        />
        <Question questionText={"What styles are your rooms?"} />
        <View style={styles.space} />
        <MultipleOptionQuestion
          tagdata={HomeRooms}
          onTagPress={(homeRoom) => {
            if (chosenHomeRooms.has(homeRoom)) {
              chosenHomeRooms.delete(homeRoom);
            } else {
              chosenHomeRooms.add(homeRoom);
            }
          }}
        />
        <View style={styles.space} />
      </ScrollView>
      <QuizNavigator
        currentpage={{
          pagename: "Home Decor",
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
            chosenHomeRooms,
            chosenHomeStyles,
          },
        }}
        pagenum={route.params.pagenum}
        totalpages={route.params.totalpages}
      />
    </View>
  );
}
