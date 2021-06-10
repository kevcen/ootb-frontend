import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { FlatList, Linking, TouchableHighlight } from "react-native";
import { StyleSheet, View, Text, Image } from "react-native";
import { Overlay } from "react-native-elements";
import Modal from "modal-react-native-web";
import Item from "../../../../interfaces/Item";
import LoadingData from "../../../components/LoadingData";
import PrimaryText from "../../../components/PrimaryText";
import PrimaryButton from "../../../components/PrimaryButton";
import BasicView from "../../../components/Product/BasicView";
import QuickView from "../../../components/Product/QuickView";
import { primary, white } from "../../../styles/Colors";
import Product from "../../../../interfaces/Product";

export default function RecommendationScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const chosenCategories: Set<String> = route.params?.categories;
  var [recommendations, setRecommendations] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());

  // on component load, get results
  React.useEffect(() => {
    // make post request to backend server
    var promise = axios.post(
      "https://gift-recommender-api.herokuapp.com/products",
      {
        categories: Array.from(chosenCategories),
        price: route.params?.price,
        gender: route.params?.gender,
        relationship: route.params?.relationship,
        occasion: route.params?.occasion,
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
        style={[
          styles.view,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <PrimaryText text={"Couldn't find any recommendations for you"} />
      </View>
    );
  }

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <PrimaryText text={"Your gift recommendations"} />
      </View>
      <FlatList
        numColumns={2}
        style={styles.grid}
        columnWrapperStyle={styles.list}
        data={recommendations}
        renderItem={({ item }: { item: Product }) => (
          <BasicView
            product={item}
            onSelect={(product: Product) => {
              wishlist.add(product);
              setWishlist(new Set(wishlist));
            }}
            isActive={wishlist.has(item)}
          />
        )}
        keyExtractor={(item) => item.name}
      />
      <PrimaryButton
        style={styles.footer}
        text={"Add selected to wishlist"}
        onPress={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    alignItems: "center",
  },
  footer: {
    bottom: 20,
    width: "80%",
    alignSelf: "center",
  },
  view: {
    flex: 1,
    backgroundColor: "white",
    alignItems:"center"
  },
  grid: {
    width: "95%",
    marginTop: 10,
  },
  list: {
    justifyContent: "space-evenly",
  },
});
