import React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import PrimaryButton from "../../../components/PrimaryButton";
import PrimaryText from "../../../components/PrimaryText";
import Question from "../../../components/Question";
import { styles } from "../../../styles/quiz";

export default function HomeScreen({ navigation }: { navigation: any }) {
  const navigateQuiz = () => {
    navigation.navigate("Recipient");
  };

  return (
    <View style={styles.viewCentered}>
      <View style={styles.space} />

      <Question questionText={"Help others find gifts for you"} />
      <View style={styles.space} />
      <Text style={styles.subtext}>
        Take our detailed quiz to find out more products which best fit your
        personal experiences
      </Text>
      <View style={styles.space} />
      <Text style={styles.subtext}>
        You can then create and share your own personal wishlist, or share the
        results from the quiz with others, to help them buy you better gifts
      </Text>

      <View style={{height:"100%",position:"absolute",justifyContent:"center", alignItems:"center"}}>
        <PrimaryButton onPress={navigateQuiz} text={"Lets go!"} />
      </View>
    </View>
  );
}
