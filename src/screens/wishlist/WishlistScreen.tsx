import React, { useState, useRef } from "react";
import { View, Image, Text, TextInput } from "react-native";
import User from "../../interfaces/User";
import {
  FlatList,
  Linking,
  TouchableHighlight,
  Platform,
  Dimensions,
  StyleSheet,
} from "react-native";
import { black, primary, white } from "../../styles/Colors";
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
import { Input } from "react-native-elements/dist/input/Input";

export default function WishlistScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const user: User = route.params?.user;
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [quickView, setQuickView] = useState(<></>);
  const [boughtState, setBoughtState] = useState<boolean[]>([]);
  const [totalChippedIn, setTotalChippedIn] = useState<number[]>([]);
  const chipValue = useRef<number>(0);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  let SliderComponent = (props: {
    maxCost: number | undefined;
    onChangeChipIn: (value: number) => any;
    total: number;
    alreadyChippedIn: number;
    currentlyChippingIn: number;
  }) => {
    const [value, setValue] = useState(0);

    return (
      <View
        style={{
          width: "100%",
        }}
      >
        <ChipInHeader
          total={props.total}
          alreadyChippedIn={props.alreadyChippedIn}
          currentlyChippingIn={value}
        />

        <Slider
          value={value}
          onValueChange={(value: number) => {
            props.onChangeChipIn(value);
            setValue(value);
          }}
          maximumValue={props.maxCost}
          thumbStyle={{
            height: 20,
            width: 20,
            backgroundColor: "black",
          }}
        />
        <Text style={{ padding: 20 }}>
          Chipping in: £{value.toFixed(2)}
        </Text>

        <TextInput style={{alignSelf:"center", borderWidth:1, width:"100%", minHeight : 80, padding:10, margin:20}} placeholder={"Add a message for "+ user.firstname +" to see"} textAlign={"left"}>
        </TextInput>
      </View>
    );
  };

  let ChipInHeader = (props: {
    total: number;
    alreadyChippedIn: number;
    currentlyChippingIn: number;
  }) => {
    return (
      <View
        style={{
          alignSelf: "center",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <Text>Total Cost: £{props.total.toFixed(2)}</Text>
        <Text>
          Left: £
          {(
            props.total -
            props.alreadyChippedIn -
            props.currentlyChippingIn
          ).toFixed(2)}
        </Text>
      </View>
    );
  };

  // on component load, get results
  React.useEffect(() => {
    // make post request to backend server
    var promise = axios.post(
      `https://gift-recommender-api.herokuapp.com/users/wishlist`,
      {
        userId: user.id,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    // create min artifical delay of 600 ms
    setTimeout(() => {
      promise
        .catch((error) => navigation.navigate("Error", { error }))
        .then((response) => {
          var wishlist = response.data;
          setWishlist(wishlist);
          setBoughtState(new Array(wishlist.length).fill(false));
          setTotalChippedIn(new Array(wishlist.length).fill(0));

          // get bought status
          return Promise.all(
            wishlist.map((product: { id: number }, idx: number) =>
              axios.get(
                `https://gift-recommender-api.herokuapp.com/users/wishlist/${user.id}/${product.id}`
              )
            )
          );
        })
        .then((responses) => {
          responses.forEach((response: any, idx: number) => {
            if (response.data) {
              boughtState[idx] = response.data.alreadyBought;
              totalChippedIn[idx] = response.data.chippedInTotal;
            }
          });
          setBoughtState(boughtState);
          setTotalChippedIn(totalChippedIn);
        })
        .catch(() => {
          return;
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
        extraData={quickView}
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
          var bannerText;
          var isFaded;
          var totalLeftToChipIn =
            (product.items ? product.items[0].cost : 0) - totalChippedIn[index];
          if (boughtState[index]) {
            bannerText = "Bought";
            isFaded = true;
          } else if (0 < totalLeftToChipIn && totalLeftToChipIn < 20) {
            bannerText = `Only chip in £${totalLeftToChipIn.toFixed(
              2
            )} and make ${user.firstname}'s day`;
          }
          return (
            <BasicView
              banner={bannerText}
              isFaded={isFaded}
              product={product}
              onSelect={(minItem: Item | undefined) => {
                setQuickView(
                  <SeeMarkChipQuickView
                    alreadyBought={boughtState[index]}
                    totalChippedIn={totalChippedIn[index]}
                    user={user}
                    product={product}
                    item={minItem}
                    navigation={navigation}
                    updateBought={() => {
                      fetch(
                        `https://gift-recommender-api.herokuapp.com/users/interested`,
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
                            boughtState[index] = true;
                            toggleOverlay();
                          }
                        });
                    }}
                    updateChipIn={() => {
                      setQuickView(
                        <View
                          style={{
                            shadowColor: black,
                            shadowOffset: { width: 0, height: 1 },
                            shadowRadius: 4,
                            shadowOpacity: 0.5,
                            borderRadius: 5,
                            minWidth: "90%",
                            alignItems: "center",
                          }}
                        >
                          <SliderComponent
                            total={minItem?.cost || 0}
                            currentlyChippingIn={chipValue.current}
                            alreadyChippedIn={totalChippedIn[index]}
                            maxCost={
                              (minItem?.cost || 0) - totalChippedIn[index]
                            }
                            onChangeChipIn={(value: number) =>
                              (chipValue.current = value)
                            }
                          />
                          <PrimaryButton
                            style={{ marginBottom: 20 }}
                            text={"Chip in"}
                            onPress={() => {
                              axios
                                .post(
                                  `https://gift-recommender-api.herokuapp.com/users/chip`,
                                  {
                                    productId: product.id,
                                    userId: user.id,
                                    money: Math.round(chipValue.current),
                                    payerName: "asddsadsda",
                                    totalCost: minItem?.cost || 0,
                                  },
                                  {
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                  }
                                )
                                .then(() => {
                                  totalChippedIn[index] += Math.round(
                                    chipValue.current
                                  );
                                  chipValue.current = 0;
                                  setTotalChippedIn(totalChippedIn);
                                  if (
                                    (minItem?.cost || 0) -
                                      totalChippedIn[index] <=
                                    0
                                  ) {
                                    alert(
                                      `Thank you for buying ${product.name} for ${user.firstname}`
                                    );
                                    boughtState[index] = true;
                                    setBoughtState(boughtState);
                                  } else {
                                    alert(
                                      `Thank you for chipping in to buy ${product.name} for ${user.firstname}. We will notify you once enough people chip in to buy the gift`
                                    );
                                  }
                                });
                              toggleOverlay();
                            }}
                          />
                        </View>
                      );
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
      </View>
      <View
        style={{
          paddingHorizontal: 15,
          width: "100%",
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
        <View
          style={{
            width: "60%",
            flexDirection: "column",
          }}
        >
          <Text style={{ padding: 10, fontSize: 20 }}>
            {user.firstname} {user.lastname}
          </Text>
          <Text style={{ padding: 10, fontSize: 20 }}>Interests:</Text>
          {user.interests.map((interest) => {
            if (
              ["a", "e", "i", "o", "u"].includes(
                interest.substring(interest.length - 1).toLowerCase()
              )
            ) {
              interest += "'s";
            }
            return (
              <Text style={{ marginLeft: 20, fontSize: 16 }}>- {interest}</Text>
            );
          })}
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
