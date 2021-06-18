import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { white } from "../../styles/Colors";

export default ({ markerValue }: { markerValue: number }) => {
  return (
    <View style={styles.marker}>
      <Text style={{ color: white }}>{markerValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  marker: {
    height: 30,
    width: 30,
    backgroundColor: "#000000",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
