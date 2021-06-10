import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Linking,
} from "react-native";
import Item from "../../../interfaces/Item";
import Product from "../../../interfaces/Product";
import { black, white } from "../../styles/Colors";
import PrimaryButton from "../PrimaryButton";

export default (props: { product: Product; item: Item }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: props.product.image }} />
      <Text style={styles.text}>{props.product.name}</Text>
      <Text style={styles.text}>{"£" + props.item.cost.toFixed(2)}</Text>
      <PrimaryButton
        style={{ borderRadius: 100, alignSelf:"center",margin:10}}
        onPress={() => Linking.openURL(props.item.website)}
        text={"view on website"}
      ></PrimaryButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: black,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.5,
    borderRadius: 5,
    minWidth: "90%",
  },
  image: {
    alignSelf: "center",
    width: "100%",
    height: 200,
  },
  text: {
    margin: 2,
  },
});
