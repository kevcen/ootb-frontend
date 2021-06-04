import * as React from "react";
import { FlatList, Linking, TouchableHighlight } from "react-native";
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
import Item from "../../interfaces/Item";
import Product from "../../interfaces/Product";

const renderItem = ({ item }: { item: any }) => {
  var product: Product = item.product;
  var minPrice = Number.MAX_SAFE_INTEGER;
  var minItem: Item | undefined;
  for (let i of product.items) {
    if (i.cost < minPrice) {
      minPrice = i.cost;
      minItem = i;
      console.log(minItem);
    }
  }
  return (
    <View style={styles.view}>
      <TouchableHighlight
        onPress={() => Linking.openURL(minItem?.website || "")}
      >
        <Image style={{ height: 240 }} source={{ uri: product.image }} />
      </TouchableHighlight>
      <Text style={{ textAlign: "center" }}>
        {product.name +
          (minPrice == Number.MAX_SAFE_INTEGER ? "" : " - £" + minPrice)}
      </Text>
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
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
    marginHorizontal: 1,
    flex: 1,
    height: 260,
    maxHeight: 260,
    backgroundColor: "white",
  },
  list: {
    justifyContent: "center",
    flexDirection: "column",
  },
});
