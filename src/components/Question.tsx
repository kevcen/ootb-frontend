import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

export default function Question({ questionText }: { questionText: string }) {
  return (
    <View>
      <Text style={styles.titleText}>{questionText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
  },
});
