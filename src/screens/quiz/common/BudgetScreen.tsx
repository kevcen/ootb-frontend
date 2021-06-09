import React, { useCallback, useState } from "react";
import { View, Text, Pressable } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { styles } from "../../../styles/quiz";
import { buttonStyles } from "../../../styles/buttons";
import { white } from "../../../styles/Colors";
import SliderMarker from "../../../components/Quiz/SliderMarker";
import Question from "../../../components/Question";

export default function BudgetScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  var [priceRange, setPriceRange] = useState([30, 75]);

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
          console.log(priceRange);
          navigation.navigate("");
        }}
        style={buttonStyles.blackCenteredFull}
      >
        <Text style={{ color: white }}>Let's go</Text>
      </Pressable>
    </View>
  );
}
