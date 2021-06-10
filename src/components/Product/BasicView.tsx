import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  Linking,
} from "react-native";
import Item from "../../../interfaces/Item";
import Product from "../../../interfaces/Product";
import { black, white } from "../../styles/Colors";
import PrimaryText from "../PrimaryText";
import QuickView from "./QuickView";
import { primary } from "../../styles/Colors";

let getCheapestItem = (items: Item[]): Item | undefined => {
  var highest = Number.POSITIVE_INFINITY;
  var minItem: Item | undefined;
  for (let item of items) {
    if (item.cost < highest) {
      highest = item.cost;
      minItem = item;
    }
  }
  return minItem;
};

export default (props: {
  product: Product;
  onSelect: (product: Product, item: Item) => any;
  isActive?: boolean;
}) => {
  const minItem: Item | undefined = getCheapestItem(props.product.items);

  if (!minItem) {
    return (
      <View style={styles.view}>
        <PrimaryText
          text={`We have no records of items for "${props.product.name}"`}
        />
      </View>
    );
  }

  return (
    <TouchableHighlight
      style={[
        styles.view,
        {
          borderColor:
             props.isActive ? primary : white,
        },
      ]}
      onPress={() => props.onSelect(props.product, minItem)}
    >
      <View>
        <Image style={styles.image} source={{ uri: props.product.image }} />
        <Text style={styles.text}>{props.product.name}</Text>
        <Text style={styles.text}>{"£" + minItem.cost.toFixed(2)}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 10,
    shadowColor: black,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.5,
    borderRadius: 5,
    height: 260,
    margin: 5,
    borderWidth: 2,
  },
  image: {
    height: 200,
  },
  text: {
    margin: 2,
  },
});
