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
import { Avatar, Overlay } from "react-native-elements";
import Modal from "modal-react-native-web";
import LoadingData from "../../components/LoadingData";
import PrimaryText from "../../components/PrimaryText";
import BasicView from "../../components/Product/BasicView";
import SeeMarkChipQuickView from "../../components/Product/SeeMarkChipQuickView";
import axios from "axios";
import Product from "../../interfaces/Product";
import Item from "../../interfaces/Item";
import WishlistLoading from "../../components/WishlistLoading";
import Constants from "expo-constants";
import CircleSlider from "react-native-circle-slider";
import PrimaryButton from "../../components/PrimaryButton";
import { Slider } from "react-native-elements";
import { Animated } from "react-native";

export default function WishlistScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  var user: User = route.params?.user;
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [quickView, setQuickView] = useState(<View />);
  var [wishlist, setWishlist] = useState([]);
  var [bannerState, setBannerState] = useState<boolean[]>([]);
  var [chipIn, setChipIn] = useState<boolean[]>([]);
  var [chipValue, setChipValue] = useState(0);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  // on component load, get results
  React.useEffect(() => {
    // make post request to backend server
    var promise = axios.post(
      `${Constants.manifest.extra?.API_URL}/users/wishlist`,
      {
        userId: user.id,
      },
      { headers: { "Content-Type": "application/json" } }
    );

    setIsLoading(true);
    // create min artifical delay of 600 ms
    setTimeout(() => {
      promise
        .then((response) => {
          console.log(response.data);
          setWishlist(response.data);
          setBannerState(new Array(response.data.length).fill(false));
          setChipIn(new Array(response.data.length).fill(false));
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
  const wishlistView =
    wishlist.length == 0 ? (
      <View
        style={[
          styles.view,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <PrimaryText text={"This user doesn't have a wishlist!"} />
      </View>
    ) : (
      <FlatList
        numColumns={2}
        style={styles.grid}
        columnWrapperStyle={styles.list}
        data={wishlist}
        renderItem={({
          item: product,
          index,
        }: {
          item: Product;
          index: number;
        }) => {
          return (
            <BasicView
              addBanner={bannerState[index]}
              product={product}
              onSelect={(minItem: Item | undefined) => {
                setQuickView(
                  <SeeMarkChipQuickView
                    product={product}
                    item={minItem}
                    navigation={navigation}
                    updateBought={() => {
                      fetch(
                        `${Constants.manifest.extra?.API_URL}/users/interested`,
                        {
                          method: "POST",
                          headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            productId: product.id,
                            userId: user.id,
                          }),
                        }
                      )
                        .then((response) => response.json())
                        .then((data) => {
                          // change this disgusting if
                          if (data.length > 0) {
                            bannerState[index] = true;
                          }
                        });
                    }}
                    updateChipIn={() => {
                      setQuickView(
                        <View>
                          <Slider
                            value={chipValue}
                            onValueChange={(value: number) => {
                              setChipValue(value);
                            }}
                            maximumValue={minItem?.cost}
                            thumbStyle={{
                              height: 40,
                              width: 40,
                              backgroundColor: "transparent",
                            }}
                            thumbProps={{
                              Component: Animated.Image,
                              source: {
                                uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                              },
                            }}
                          />
                          <PrimaryButton
                            text={"Chip in"}
                            onPress={() => {
                              fetch(
                                `${Constants.manifest.extra?.API_URL}/users/chipin`,
                                {
                                  method: "POST",
                                  headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    productId: product.id,
                                    userId: user.id,
                                    money: chipValue,
                                    payerName: "asddsadsda",
                                  }),
                                }
                              );
                              toggleOverlay();
                            }}
                          />
                        </View>
                      );
                      chipIn[index] = true;
                    }}
                  />
                );
                toggleOverlay();
              }}
            />
          );
        }}
        keyExtractor={(item) => item.name}
      />
    );

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <PrimaryText
          text={
            user.public
              ? `This is ${user.firstname}'s wishlist`
              : `${user.firstname}'s has a private profile, so you can only see their interests`
          }
        />
        <View
          style={{
            paddingHorizontal: 15,
            width: "100%",
            flex: 1,
            flexDirection: "row",
          }}
        >
          <Avatar
            size="xlarge"
            title={(user.firstname[0] + user.lastname[0]).toUpperCase()}
            source={user.image ? { uri: user.image } : undefined}
            overlayContainerStyle={{ backgroundColor: "darkgrey" }}
            activeOpacity={0.6}
          />

          <Text style={{ width: "80%", padding: 10, fontSize: 20 }}>
            {user.firstname} {user.lastname}
          </Text>
        </View>
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
