import React, { useState } from "react";
import { View, Image, Text } from "react-native";
import User from "../../interfaces/User";
import {
  FlatList,
  Linking,
  TouchableHighlight,
  Platform,
  Dimensions,
  StyleSheet,
} from "react-native";
import { primary, white } from "../../styles/Colors";
import { Overlay } from "react-native-elements";
import Modal from "modal-react-native-web";
import LoadingData from "../../components/LoadingData";
import PrimaryText from "../../components/PrimaryText";
import BasicView from "../../components/Product/BasicView";
import QuickView from "../../components/Product/QuickView";
import axios from "axios";
import Product from "../../interfaces/Product";
import Item from "../../interfaces/Item";
import WishlistLoading from "../../components/WishlistLoading";

export default function WishlistScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  var user: User = route.params.user;
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [quickView, setQuickView] = useState(<View />);
  var [wishlist, setWishlist] = useState([]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  // on component load, get results
  React.useEffect(() => {
    // make post request to backend server
    var promise = axios.post(
      "https://gift-recommender-api.herokuapp.com/users/wishlist",
      {
        userId: user.id,
      },
      { headers: { "Content-Type": "application/json" } }
    )

    // create min artifical delay of 600 ms
    let timer = setTimeout(() => {
      promise
        .then((response) => {
          console.log(response.data);
          setWishlist(response.data);
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
    return <WishlistLoading />;
  }
  // Platform independent quickviews
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


  // Displaying dependent on wishlist items
  const wishlistView = wishlist.length == 0 
    ? <View
        style={[
          styles.view,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <PrimaryText text={"This user doesn't have a wishlist!"} />
      </View>
    : <FlatList
        numColumns={2}
        style={styles.grid}
        columnWrapperStyle={styles.list}
        data={wishlist}
        renderItem={({ item: product }: { item: Product }) => (
          <BasicView
            product={product}
            onLongPress={(minItem: Item) => {
              setQuickView(<QuickView product={product} item={minItem} />);
              toggleOverlay();
            }}
            onSelect={(minItem: Item) => {
              setQuickView(<QuickView product={product} item={minItem} />);
              toggleOverlay();
            }}
          />
        )}
        keyExtractor={(item) => item.name}
      />
  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Image
          source={{ uri: user.image }}
          style={{ height: 100, width: 100 }}
        />
        <Text>
          {user.firstname} {user.lastname}
        </Text>
      </View>

      {wishlistView}

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
    bottom: 20,
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
    marginTop: 10,
  },
  list: {
    justifyContent: "space-evenly",
  },
  overlay: {
    backgroundColor: white,
  },
});