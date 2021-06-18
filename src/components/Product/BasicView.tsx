import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  Linking,
} from "react-native";
import Item from "../../interfaces/Item";
import Product from "../../interfaces/Product";
import { black, white } from "../../styles/Colors";
import PrimaryText from "../PrimaryText";
import QuickView from "./QuickView";
import { primary } from "../../styles/Colors";

let getCheapestItem = (items: Item[] | undefined): Item | undefined => {
  var highest = Number.POSITIVE_INFINITY;
  var minItem: Item | undefined;
  console.log(items);
  if (items) {
    for (let item of items) {
      if (item.cost < highest) {
        highest = item.cost;
        minItem = item;
      }
    }
  }

  return minItem;
};

export default (props: {
  product: Product;
  onSelect?: (item: Item | undefined) => any;
  onLongPress?: (item: Item | undefined) => any;
  isActive?: boolean;
  isFaded?: boolean;
  banner?: string;
}) => {
  const minItem: Item | undefined = getCheapestItem(props.product.items);

  return (
    <TouchableHighlight
      onLongPress={() => {
        props.onLongPress ? props.onLongPress(minItem) : null;
      }}
      underlayColor="#0000"
      style={[
        styles.view,
        {
          borderColor: props.isActive ? primary : white,
          opacity: props.isFaded ? 0.4 : (props.banner ? 0.7 : 1),
        },
      ]}
      onPress={() => {
        props.onSelect ? props.onSelect(minItem) : null;
      }}
    >
      <View>
        {props.banner && (
          <View style={styles.viewCrossed}>
            <Text style={styles.textBanner}>{props.banner}</Text>
          </View>
        )}
        <Image style={styles.image} source={{ uri: props.product.image }} />
        <Text style={styles.text} numberOfLines={1}>
          {props.product.name}
        </Text>
        {minItem && (
          <Text style={styles.text}>{"£" + minItem.cost.toFixed(2)}</Text>
        )}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: black,
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.5,
    borderRadius: 5,
    maxHeight: 260,
    margin: 5,
    borderWidth: 2,
  },
  image: {
    height: 200,
  },
  text: {
    margin: 2,
  },
  viewCrossed: {
    zIndex: 999,
    alignSelf:"center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    padding:10,
    backgroundColor: "blue",
    borderRadius:5
  },
  textBanner: {
    fontSize: 20,
    color: "white",
    textAlign:"center"
  },
});
