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
  var product: Product = item.product;
  var price = Number.MAX_SAFE_INTEGER;
  for (let i of product.items) {
    price = Math.min(i.cost, price);
  }
  return (
    <View style={styles.view}>
      <Image style={{ height: 240 }} source={{ uri: product.image }} />
      <Text style={{textAlign : "center"}}>{product.name + (price == Number.MAX_SAFE_INTEGER ? "" : " - £" + price)}</Text>
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
    <View style={{flex:1,backgroundColor:"white"}}>
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
