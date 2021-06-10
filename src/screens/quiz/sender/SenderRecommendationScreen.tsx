import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { FlatList, Linking, TouchableHighlight, Platform } from "react-native";
import { StyleSheet, View, Text, Image } from "react-native";
import { Overlay } from "react-native-elements";
import Modal from "modal-react-native-web";
import Item from "../../../../interfaces/Item";
import LoadingData from "../../../components/LoadingData";
import PrimaryText from "../../../components/PrimaryText";
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
  const [visible, setVisible] = useState(false);
  const [quickView, setQuickView] = useState(<View />);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  // on component load, get results
  React.useEffect(() => {
    // make post request to backend server
    var promise = axios.post("https://gift-recommender-api.herokuapp.com/products", {
      categories: Array.from(chosenCategories),
      price: route.params?.price,
      gender: route.params?.gender,
      relationship: route.params?.relationship,
      occasion: route.params?.occasion,

      //Fashion
      clothesStoreTypes: Array.from(
        route.params?.chosenClothesStoreTypes || new Set()
      ),
      clothingSeasons: Array.from(
        route.params?.chosenClothingSeasons || new Set()
      ),
      fashionWear: Array.from(route.params?.chosenFashionWear || new Set()),

      //Food
      doesCook: route.params?.doesCook,
      doesDrink: route.params?.doesDrink,
      cuisines: Array.from(route.params?.chosenCuisines || new Set()),

      //Fragrance
      perfumeTypes: Array.from(route.params?.chosenPerfumeTypes || new Set()),
      fragranceFamilies: Array.from(
        route.params?.chosenFragranceFamilies || new Set()
      ),

      //Gardening
      hasGreenhouse: route.params?.hasGreenhouse,
      plantSizes: Array.from(route.params?.chosenPlantSizes || new Set()),
      plantTypes: Array.from(route.params?.chosenPlantTypes || new Set()),

      //Health & Beauty
      likesMakeup: route.params?.likesMakeup,
      beautyProductTypes: Array.from(
        route.params?.chosenBeautyProductTypes || new Set()
      ),

      // Home Decor
      homeRooms: Array.from(route.params?.chosenHomeRooms || new Set()),
      homeStyles: Array.from(route.params?.chosenHomeStyles || new Set()),

      //Music
      genres: Array.from(route.params?.chosenGenres || new Set()),
      instruments: Array.from(route.params?.chosenInstruments || new Set()),

      //Photography
      cameraTypes: Array.from(route.params?.chosenCameraTypes || new Set()),
      photographyExperience: Array.from(
        route.params?.chosenExperience || new Set()
      ),

      //Sport
      playSports: Array.from(route.params?.chosenPlaySports || new Set()),
      watchSports: Array.from(route.params?.chosenWatchSports || new Set()),
    });

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
  const webQuickView = (
  <Overlay
    ModalComponent={Modal}
    isVisible={visible}
    onBackdropPress={toggleOverlay}
    style={styles.overlay}
  >
    {quickView}
  </Overlay>);

  const phoneQuickView = (
  <Overlay
    isVisible={visible}
    onBackdropPress={toggleOverlay}
    style={styles.overlay}
  >
    {quickView}
  </Overlay>);
  
  const itemQuickView = Platform.select({
    ios: phoneQuickView,
    android: phoneQuickView,
    default: webQuickView,
  })
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
            onSelect={(product: Product, item: Item) => {
              setQuickView(<QuickView product={product} item={item} />);
              toggleOverlay();
            }}
          />
        )}
        keyExtractor={(item) => item.name}
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
