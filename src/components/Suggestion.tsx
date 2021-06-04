import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text, View } from "./Themed";

export default function Suggestion({
  imgURL,
  caption,
}: {
  imgURL: string;
  caption: string;
}) {
  return (
    <View>
      <Image style={styles.image} source={{ uri: imgURL }} />
      <Text style={{ textAlignVertical: "center", textAlign: "center" }}>
        {caption}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
