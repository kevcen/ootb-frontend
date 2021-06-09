import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { FlatList, Linking, TouchableHighlight } from "react-native";
import { StyleSheet, View, Text, Image } from "react-native";
import Item from "../../interfaces/Item";
import Product from "../../interfaces/Product";
import LoadingData from "../components/LoadingData";
import PrimaryText from "../components/PrimaryText";

const renderItem = ({ item: product }: { item: Product }) => {
  var minPrice = Number.MAX_SAFE_INTEGER;
  var minItem: Item | undefined;
  for (let i of product.items) {
    if (i.cost < minPrice) {
      minPrice = i.cost;
      minItem = i;
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
  const [isLoading, setIsLoading] = useState(true);
  const chosenCategories: Set<String> = route.params?.chosenCategories;
  var [recommendations, setRecommendations] = useState([]);

  // on component load, get results
  React.useEffect(() => {
    // make post request to backend server
    var promise = axios.post(
      "https://gift-recommender-api.herokuapp.com/products",
      {
        categories: Array.from(chosenCategories),
      }
    );

    // create min artifical delay of 500 ms
    setTimeout(() => {
      promise
        .then((response) => {
          setRecommendations(response.data);
        })
        .catch((error) => {
          navigation.navigate("Error", { error });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 600);
  }, []);

  if (isLoading) {
    return <LoadingData />;
  }

  if (recommendations.length == 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PrimaryText text={"Couldn't find any recommendations for you"} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        numColumns={2}
        contentContainerStyle={styles.list}
        data={recommendations}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
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
