import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Pressable,
} from "react-native";
import { primary, white } from "../styles/Colors";

export default (props: { onPress: () => any; text: string }) => {
  return (
    <Pressable onPress={props.onPress} style={styles.button}>
      <Text style={styles.buttonText}>{props.text.toUpperCase()}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: "57px",
    width: "222px",
    backgroundColor: primary,
    textAlign: "center",
    justifyContent: "center",
  },
  buttonText: {
    height: "20px",
    width: "100%",
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 2.5,
    lineHeight: 20,
    color: white,
  },
});
