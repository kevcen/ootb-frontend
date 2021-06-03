import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

export default function Question({ questionText }: { questionText: string }) {
  return <Text style={styles.question}>{questionText}</Text>;
}

const styles = StyleSheet.create({
  question: {
    padding: 30,
    fontSize: 20,
  },
});
