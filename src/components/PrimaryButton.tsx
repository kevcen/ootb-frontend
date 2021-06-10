import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { primary, secondary, white } from "../styles/Colors";

export default (props: { onPress: () => any; text: string; style?: any }) => {
  return (
    <TouchableHighlight
      underlayColor={secondary}
      onPress={props.onPress}
      style={[styles.button, props.style]}
    >
      <Text style={styles.buttonText}>{props.text.toUpperCase()}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    padding:5,
    height: 57,
    width: 250,
    backgroundColor: primary,
    justifyContent: "center",
    alignItems:"center",
  },
  buttonText: {
    textAlign: "center",
    width: "100%",
    fontFamily: "roboto-light",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 2.5,
    lineHeight: 20,
    color: white,
  },
});
