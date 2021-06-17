import React from "react";
import { View, StyleSheet, Text, Image, Linking } from "react-native";
import beautyProductTypes from "../../constants/BeautyProductTypes";
import Item from "../../interfaces/Item";
import Product from "../../interfaces/Product";
import Navigation from "../../navigation";
import { black, white } from "../../styles/Colors";
import PrimaryButton from "../PrimaryButton";

export default (props: { product: Product; item?: Item; navigation?: any }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: props.product.image }} />
      <Text style={styles.text}>{props.product.name}</Text>
      {props.item && (
        <Text style={styles.text}>{"£" + props.item.cost.toFixed(2)}</Text>
      )}
      <PrimaryButton
        style={{ borderRadius: 100, alignSelf: "center", margin: 10 }}
        onPress={() => {
          if (props.item) {
            Linking.openURL(props.item.website);
          } else {
            props.navigation.navigate("SenderRecommendations", {
              categories: [props.product.name],
            });
          }
        }}
        text={props.item ? "view on website" : "see related items"}
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
