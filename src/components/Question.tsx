import React from "react";
import { StyleSheet } from "react-native";

import { Text } from "./Themed";

export default function Question({ questionText }: { questionText: string }) {
  return <Text style={styles.question}>{questionText}</Text>;
}

const styles = StyleSheet.create({
  question: {
    top:10,
    fontSize: 20,
    textAlign:"center",
    color: "black"
  },
});
