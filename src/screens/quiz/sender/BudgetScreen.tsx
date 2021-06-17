import React, { useState } from "react";
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { styles } from "../../../styles/quiz";
import SliderMarker from "../../../components/Quiz/SliderMarker";
import Question from "../../../components/Question";
import QuizNavigator from "../../../components/Quiz/QuizNavigator";
import { Label } from "native-base";

export default function BudgetScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(200);
  var [priceRange, setPriceRange] = useState([0, 200]);
  const [tempMin, setTempMin] = React.useState(0);
  const [tempMax, setTempMax] = React.useState(200);
  const [minError, setMinError] = React.useState(false);
  const [maxError, setMaxError] = React.useState(false);

  const validMin = (min: Number) => {
    var res = min < tempMax;
    setMinError(!res);
    return res;
  };

  const validMax = (max: Number) => {
    var res = tempMin < max;
    setMaxError(!res);
    return res;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <View style={styles.viewCentered}>
      <Question questionText={"What price range should the gift be?"} />
      <View style={styles.space} />
      <View style={styles.space} />
      <View style={styles.space} />
      <MultiSlider
        isMarkersSeparated={true}
        enabledOne={true}
        enabledTwo={true}
        enableLabel={true}
       
        selectedStyle={{
          backgroundColor: "gold",
        }}
        unselectedStyle={{
          backgroundColor: "silver",
        }}
        onValuesChangeFinish={(values) => {
          priceRange[0] = values[0];
          priceRange[1] = values[1];
          setMin(values[0]);
          setTempMin(values[0]);
          setMax(values[1]);
          setTempMax(values[1]);
        }}
        values={[Number(min), Number(max)]}
        trackStyle={{
          height: 10,
        }}
        customMarkerLeft={(e) => {
          return <SliderMarker markerValue={e.currentValue} />;
        }}
        customMarkerRight={(e) => {
          return <SliderMarker markerValue={e.currentValue} />;
        }}
        sliderLength={300}
        min={0}
        max={200}
        allowOverlap={true}
      />


      <View style={styles.row}>

        <TextInput
          placeholder="Min"
          style={[
            styles.numericInput,
            { borderColor: minError ? "red" : "black" },
          ]}
          keyboardType={"numeric"}
          textAlign={"center"}
          maxLength={4}
          value={"£" + tempMin.toString()}
          onChangeText={(e) => {
            if (!isNaN(Number(e.substring(1)))) {
              setTempMin(Number(e.substring(1)));
            }
          }}
          onBlur={() => {
            if (validMin(tempMin) && validMax(tempMax)) {
              setMin(tempMin);
              setMax(tempMax);
            }
          }}
        />

        <TextInput
          placeholder="Max"
          style={[
            styles.numericInput,
            { borderColor: minError ? "red" : "black" },
          ]}
          keyboardType={"numeric"}
          textAlign={"center"}
          maxLength={4}
          value={"£" + tempMax.toString()}
          onChangeText={(e) => {
            if (!isNaN(Number(e.substring(1)))) {
              setTempMax(Number(e.substring(1)));
            }
          }}
          onBlur={() => {
            if (validMin(tempMin) && validMax(tempMax)) {
              setMin(tempMin);
              setMax(tempMax);
            }
          }}
        />
      </View>

      <View style={styles.space} />
      {minError || maxError ? (
        <QuizNavigator
          currentpage={{
            pagename: "Budget",
            params: { ...route.params },
          }}
          navigation={navigation}
          prev={{
            pagename: "SenderCategories",
          }}
          next={{ pagename: "" }}
          pagenum={route.params.pagenum}
          totalpages={route.params.totalpages}
        />
      ) : (
        <QuizNavigator
          currentpage={{
            pagename: "Budget",
            params: { ...route.params },
          }}
          navigation={navigation}
          prev={{
            pagename: "SenderCategories",
          }}
          next={{
            pagename: "SenderRecommendations",
            params: { price: priceRange },
          }}
          pagenum={route.params.pagenum}
          totalpages={route.params.totalpages}
        />
      )}
    </View>
    </TouchableWithoutFeedback>

  );
}
