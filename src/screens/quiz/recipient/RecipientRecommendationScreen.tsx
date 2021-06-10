import axios from "axios";
import * as React from "react";
import { useRef, useState } from "react";
import { FlatList, Linking, Platform, TouchableHighlight } from "react-native";
import { StyleSheet, View, Text, Image } from "react-native";
import { Overlay } from "react-native-elements";
import Modal from "modal-react-native-web";
import Item from "../../../interfaces/Item";
import LoadingData from "../../../components/LoadingData";
import PrimaryText from "../../../components/PrimaryText";
import PrimaryButton from "../../../components/PrimaryButton";
import BasicView from "../../../components/Product/BasicView";
import QuickView from "../../../components/Product/QuickView";
import { primary, white } from "../../../styles/Colors";
import Product from "../../../interfaces/Product";

export default function RecommendationScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [isLoading, setIsLoading] = useState(true);
  var [recommendations, setRecommendations] = useState([]);

  const wishlist = useRef(new Set<Product>());
  const [updated, forceUpdate] = useState(true);

  const [visible, setVisible] = useState(false);
  const [quickView, setQuickView] = useState(<View />);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const navigateToRankPage = () => {
    navigation.navigate("Ranking", {
      products: Array.from(wishlist.current),
    });
  };

  // on component load, get results
  React.useEffect(() => {
    // make post request to backend server
    var promise = axios.post(
      "https://gift-recommender-api.herokuapp.com/products",
      {
        categories: Array.from(route.params?.categories),
        price: route.params?.price,
        gender: route.params?.gender,
        relationship: route.params?.relationship,
        occasion: route.params?.occasion,
      }
    );

    // create min artifical delay of 600 ms
    let timer = setTimeout(() => {
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
    return () => {
      clearTimeout(timer);
    };
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
  const webQuickView = (
    <Overlay
      ModalComponent={Modal}
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      style={styles.overlay}
    >
      {quickView}
    </Overlay>
  );

  const phoneQuickView = (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      style={styles.overlay}
    >
      {quickView}
    </Overlay>
  );

  const itemQuickView = Platform.select({
    ios: phoneQuickView,
    android: phoneQuickView,
    default: webQuickView,
  });
  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <PrimaryText style={{textAlign:"left",width:"90%",margin:15}} text={"Your gift recommendations"} />
      </View>
      <FlatList
        numColumns={2}
        style={styles.grid}
        columnWrapperStyle={styles.list}
        data={recommendations}
        extraData={updated}
        renderItem={({ item: product }: { item: Product }) => (
          <BasicView
            key={product.name}
            product={product}
            onLongPress={(minItem: Item) => {
              setQuickView(<QuickView product={product} item={minItem} />);
              toggleOverlay();
            }}
            onSelect={() => {
              if (wishlist.current.has(product)) {
                wishlist.current.delete(product);
              } else {
                wishlist.current.add(product);
              }
              forceUpdate(!updated);
            }}
            isActive={wishlist.current.has(product)}
          />
        )}
        keyExtractor={(item) => item.name}
      />
      <PrimaryButton
        style={styles.footer}
        text={`Add ${
          wishlist.current.size == 0 ? "selected" : wishlist.current.size
        } to wishlist`}
        onPress={navigateToRankPage}
      />
      {itemQuickView}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    alignItems: "center",
  },
  footer: {
    bottom: 10,
    width: "80%",
    alignSelf: "center",
  },
  view: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  grid: {
    width: "95%",
    marginBottom: 20,
  },
  list: {
    justifyContent: "space-evenly",
  },
  overlay: {
    backgroundColor: white,
  },
});
