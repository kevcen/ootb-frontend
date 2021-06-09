import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Pressable,
} from "react-native";
import { primary, white } from "../styles/Colors";
import { useFonts, Nunito_400Regular } from "@expo-google-fonts/nunito";
import LoadingData from "./LoadingData";

export default (props: { text: string }) => {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
  });


  if (!fontsLoaded) {
    return <LoadingData />;
  }
  
  return <Text style={styles.text}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    width: "80%",
    margin:20,
    fontFamily: "Nunito_400Regular",
    fontSize: 23,
    fontWeight: "700",
    lineHeight: 31,
    color: primary,
    textAlign: "center",
  },
});
