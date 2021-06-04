import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Question from "../components/Question";
import { buttonStyles } from "../styles/buttons";
import { white } from "../styles/colors";

export default function IntroScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.question}>
      <Question
        questionText={"Please tell us a bit about more about the receiver"}
      />
      <Pressable
        onPress={() => {
          navigation.navigate("Categories");
        }}
        style={buttonStyles.blackCenteredFull}
      >
        <Text style={white}>Let's go</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  question: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
