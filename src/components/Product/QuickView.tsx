import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  Linking,
} from "react-native";
import { Overlay } from "react-native-elements";
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
        style={{ borderRadius: 100 }}
        onPress={() => Linking.openURL(props.item.website)}
        text={"view on website"}
      ></PrimaryButton>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    backgroundColor: white,
  },
  container: {
    padding: 10,
    shadowColor: black,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.5,
    borderRadius: 5,
    margin: 10,
  },
  image: {
    flex: 1,
    flexDirection: "row",
    height: 300,
  },
  text: {
    margin: 2,
  },
});
