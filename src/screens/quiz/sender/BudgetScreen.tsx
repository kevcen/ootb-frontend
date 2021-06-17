import React, { useCallback, useState } from "react";
import { View, Text, Pressable, TextInput, TouchableWithoutFeedback, Keyboard} from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { styles } from "../../../styles/quiz";
import { buttonStyles } from "../../../styles/buttons";
import { white } from "../../../styles/Colors";
import SliderMarker from "../../../components/Quiz/SliderMarker";
import Question from "../../../components/Question";
import axios from "axios";
import LoadingData from "../../../components/LoadingData";
import QuizNavigator from "../../../components/Quiz/QuizNavigator";

export default function BudgetScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [min, onChangeMin] = React.useState(0);
  const [max, onChangeMax] = React.useState(1000);
  var [priceRange, setPriceRange] = useState([0, 200]);
  var nextMin = 0
  var nextMax = 1000

  const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => {
        // Keyboard.dismiss()
        if (validMin(nextMin) && validMax(nextMax)) {
          onChangeMin(nextMin)
          onChangeMax(nextMax)
        }
        console.log("clicked out")
    }}>
      {children}
    </TouchableWithoutFeedback>
  );

  // const DismissKeyboard = () => (
  //   <TouchableWithoutFeedback 
  //     onPress={() => 
  //       Keyboard.dismiss()
        
  //     }>
  //   </TouchableWithoutFeedback>
  //   );

  const validMin = (min: Number) => {
    return min < max
  };

  const validMax = (max: Number) => {
    return min < max
  };

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
          onChangeMin(values[0])
          onChangeMax(values[1])
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

    <HideKeyboard>

    <View style={styles.row}>  


      <TextInput
              placeholder="Min"
              style={styles.numericInput}  
              keyboardType={'numeric'}
              textAlign={'center'}
              maxLength={3}
              value = {min.toString()}
              onChangeText={e => {
                nextMin = Number(e)
              }} 
        />

        <TextInput
              placeholder="Max"
              style={styles.numericInput}  
              keyboardType={'numeric'}
              textAlign={'center'}
              maxLength={3}
              value = {max.toString()}
              onChangeText={e => {
                nextMax = Number(e)
              }}
        />  
     
    </View>  
    </HideKeyboard>

    <View style={styles.space} />
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
    </View>

  );
}
