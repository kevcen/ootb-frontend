import React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import PrimaryButton from "../../../components/PrimaryButton";
import PrimaryText from "../../../components/PrimaryText";
import Question from "../../../components/Question";
import { styles } from "../../../styles/quiz";

export default function HomeScreen({ navigation }: { navigation: any }) {
  const navigateQuiz = () => {
    navigation.navigate("Search");
  };

  return (
    <View style={styles.viewCentered}>
      <View style={styles.space} />

      <Question questionText={"Finding the best gift for someone"} />
      <View style={styles.space} />
      <Text style={styles.subtext}>
        Take our detailed quiz to get a list of recommendations that best fit
        the person you are gifting to
      </Text>

      <View
        style={{
          height: "100%",
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PrimaryButton onPress={navigateQuiz} text={"Lets go!"} />
      </View>
    </View>
  );
}
