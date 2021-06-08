import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import Question from "../../../components/Question";
import { buttonStyles } from "../../../styles/buttons";
import { white } from "../../../styles/Colors";
import occasions from "../../../constants/Occassion";


let genData = (): any[] => {
  var data = new Array();
  occassions.forEach((occassionName, index) => {
    data.push({ key: "cat_" + index, title: occassionName });
  });
  return data;
};

export default function OccasionScreen({ navigation }: { navigation: any }) {



  return (
    <View>
      <Question 
        questionText={"What is the occasion, if any?"} />
      
      <Pressable
        onPress={() => {
          navigation.navigate("Categories");
        }}
        style={buttonStyles.blackCenteredFull}
      >
        <Text style={{color:white}}>Let's go</Text>
      </Pressable>
    </View>
  );
}
