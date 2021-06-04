import * as React from "react";
import { FlatList } from "react-native";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  Pressable,
  Dimensions,
  Image,
} from "react-native";
import Product from "../../interfaces/Product";

const renderItem = ({ item }: { item: any }) => {
  var product: Product = item.product
  console.log(product)
  return (
    <View style={styles.view}>
      <Image
        style={{  height: "100%" }}
        source={{ uri: product.image }}
      />
      <Text>{product.name}</Text>
      <Text>{product.items[0]?.cost}</Text>
    </View>
  );
};

export default function RecommendationScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const recommendations: Product[] = route.params?.recommendations;
  const data = recommendations.map((product, idx) => {
    return { key: "cat_" + idx, product };
  });
  return (
    <View>
      <FlatList
        numColumns={2}
        contentContainerStyle={styles.list}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    margin: 5,
    minWidth: 170,
    maxWidth: 223,
    height: 304,
    maxHeight: 304,
    backgroundColor: "#CCC",
  },
  list: {
    justifyContent: "center",
    flexDirection: "row",
  },
});
