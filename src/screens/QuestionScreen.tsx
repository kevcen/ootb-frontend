import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import Question from "../components/Question";

export default function QuestionScreen({
  questionText,
}: {
  questionText: string;
}) {
  return (
    <View style={styles.container}>
      <Question questionText={questionText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
