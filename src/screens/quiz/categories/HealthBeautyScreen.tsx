import React, {useState, useRef} from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import Question from "../../../components/Question";
import MultipleOptionQuestion from "../../../components/Quiz/MultipleOptionQuestion";
import QuizNavigator from "../../../components/Quiz/QuizNavigator";
import SingleOptionQuestion from "../../../components/Quiz/SingleOptionQuestion";
import BeautyProductTypes from "../../../constants/BeautyProductTypes";
import DietaryRequirements from "../../../constants/DietaryRequirements";
import yesNo from "../../../constants/YesNo";
import { styles } from "../../../styles/quiz";

export default function RecipientContextScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  var [likesMakeup, setLikesMakeup] = useState(true);
  var chosenBeautyProductTypes = useRef(new Set());

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
        <Question questionText={"Do you like make-up?"} />
        <View style={styles.space} />
        <SingleOptionQuestion
          tagdata={yesNo}
          onTagPress={(tagname) => (setLikesMakeup(tagname == "Yes"))}
        />
        <Question questionText={"What types of products do you want?"} />
        <View style={styles.space} />
        <MultipleOptionQuestion
          tagdata={BeautyProductTypes}
          onTagPress={(type) => {
            if (chosenBeautyProductTypes.current.has(type)) {
              chosenBeautyProductTypes.current.delete(type);
            } else {
              chosenBeautyProductTypes.current.add(type);
            }
          }}
        />
      </ScrollView>
      <QuizNavigator
        currentpage={{
          pagename: "Health & Beauty",
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
            likesMakeup,
            chosenBeautyProductTypes: chosenBeautyProductTypes.current,
          },
        }}
        pagenum={route.params.pagenum}
        totalpages={route.params.totalpages}
      />
    </View>
  );
}
