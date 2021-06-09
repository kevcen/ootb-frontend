import React, { useCallback, useState } from "react";
import { View, Text, Pressable } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { styles } from "../../../styles/quiz";
import { buttonStyles } from "../../../styles/buttons";
import { white } from "../../../styles/Colors";
import SliderMarker from "../../../components/Quiz/SliderMarker";
import Question from "../../../components/Question";
import axios from "axios";
import LoadingData from "../../../components/LoadingData";

export default function BudgetScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  var [priceRange, setPriceRange] = useState([30, 75]);
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <LoadingData />;
  }

  return (
    <View style={styles.viewCentered}>
      <Question questionText={"What price range should the gift be?"} />
      <View style={styles.space} />
      <View style={styles.space} />
      <View style={styles.space} />
      <MultiSlider
        isMarkersSeparated={true}
        enabledOne={true}
        enabledTwo={true}
        selectedStyle={{
          backgroundColor: "gold",
        }}
        unselectedStyle={{
          backgroundColor: "silver",
        }}
        onValuesChangeFinish={(values) => {
          priceRange[0] = values[0];
          priceRange[1] = values[1];
        }}
        values={priceRange}
        trackStyle={{
          height: 10,
        }}
        customMarkerLeft={(e) => {
          return <SliderMarker markerValue={e.currentValue} />;
        }}
        customMarkerRight={(e) => {
          return <SliderMarker markerValue={e.currentValue} />;
        }}
        sliderLength={280}
        min={10}
        max={100}
        allowOverlap={true}
      />

      <View style={styles.space} />
      <Pressable
        onPress={() => {
          setIsLoading(true);
          var promise = axios.post(
            "https://gift-recommender-api.herokuapp.com/products",
            {
              categories: Array.from(route.params?.categories.current),
              price: route.params?.priceRange,
              gender: route.params?.gender,
              relationship: route.params?.relationship,
              occasion: route.params?.occasion,
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
        style={buttonStyles.blackCenteredFull}
      >
        <Text style={{ color: white }}>Let's go</Text>
      </Pressable>
    </View>
  );
}
