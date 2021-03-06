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
import ClothingSeasons from "../../../constants/ClothingSeasons";
import ClothesStoreTypes from "../../../constants/ClothesStoreTypes";
import FashionWear from "../../../constants/FashionWear";
import Cuisines from "../../../constants/Cuisines";
import DietaryRequirements from "../../../constants/DietaryRequirements";
import PerfumeTypes from "../../../constants/PerfumeTypes";
import FragranceFamilies from "../../../constants/FragranceFamilies";
import PlantSizes from "../../../constants/PlantSizes";
import PlantTypes from "../../../constants/PlantTypes";
import BeautyProductTypes from "../../../constants/BeautyProductTypes";
import HomeRooms from "../../../constants/HomeRooms";
import HomeStyles from "../../../constants/HomeStyles";
import Genres from "../../../constants/Genres";
import Instruments from "../../../constants/Instruments";
import CameraTypes from "../../../constants/CameraTypes";
import PhotographyExperience from "../../../constants/PhotographyExperience";
import Sports from "../../../constants/Sports";
import TagData from "../../../interfaces/TagData";
import Genders from "../../../constants/Genders";
import Relationships from "../../../constants/Relationships";
import PrimaryButtonStyles from "../../../styles/PrimaryButtonStyles";

function formatSet(set: any, allOptions: TagData[]) {
  var res = new Set<string>(Array.from(set || new Set()));
  if (
    res.has("Any") ||
    res.has("Prefer not to say") ||
    res.has("Other") ||
    res.has("") ||
    res.size == 0
  ) {
    allOptions.forEach((tag) => res.add(tag.title));
  }
  console.log(res);
  return Array.from(res).map((v) => v.toLowerCase());
}

function formatBool(val: any) {
  if (val == undefined) {
    return true;
  }
  return val
}

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
      interests: Array.from(route.params?.categories),
    });
  };

  // on component load, get results
  React.useEffect(() => {
    // make post request to backend server
    var promise = axios.post(
      `https://gift-recommender-api.herokuapp.com/products`,
      {
        categories: Array.from(route.params?.categories),
        price: route.params?.price,
        gender: formatSet(route.params?.gender, Genders),
        relationship: formatSet(route.params?.relationship, Relationships),
        occasion: route.params?.occasion,

        //Fashion
        clothesStoreTypes: formatSet(
          route.params?.chosenClothesStoreTypes,
          ClothesStoreTypes
        ),
        clothingSeasons: formatSet(
          route.params?.chosenClothingSeasons,
          ClothingSeasons
        ),
        fashionWear: formatSet(route.params?.chosenFashionWear, FashionWear),

        //Food
        doesCook: formatBool(route.params?.doesCook),
        doesDrink: formatBool(route.params?.doesDrink),
        cuisines: formatSet(route.params?.chosenCuisines, Cuisines),
        dietaryRequirements: formatSet(
          route.params?.chosenDietaryRequirements,
          DietaryRequirements
        ),

        //Fragrance
        perfumeTypes: formatSet(route.params?.chosenPerfumeTypes, PerfumeTypes),
        fragranceFamilies: formatSet(
          route.params?.chosenFragranceFamilies,
          FragranceFamilies
        ),

        //Gardening
        hasGreenhouse: formatBool(route.params?.hasGreenhouse),
        plantSizes: formatSet(route.params?.chosenPlantSizes, PlantSizes),
        plantTypes: formatSet(route.params?.chosenPlantTypes, PlantTypes),

        //Health & Beauty
        likesMakeup: formatBool(route.params?.likesMakeup),
        beautyProductTypes: formatSet(
          route.params?.chosenBeautyProductTypes,
          BeautyProductTypes
        ),

        // Home Decor
        homeRooms: formatSet(route.params?.chosenHomeRooms, HomeRooms),
        homeStyles: formatSet(route.params?.chosenHomeStyles, HomeStyles),

        //Music
        genres: formatSet(route.params?.chosenGenres, Genres),
        instruments: formatSet(route.params?.chosenInstruments, Instruments),

        //Photography
        cameraTypes: formatSet(route.params?.chosenCameraTypes, CameraTypes),
        photographyExperience: formatSet(
          route.params?.chosenExperience,
          PhotographyExperience
        ),

        //Sport
        playSports: formatSet(route.params?.chosenPlaySports, Sports),
        watchSports: formatSet(route.params?.chosenWatchSports, Sports),
      },
      { headers: { "Content-Type": "application/json" } }
    );

    // create min artifical delay of 600 ms
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
        <PrimaryText
          style={{ textAlign: "left", width: "90%", margin: 15 }}
          text={"Your gift recommendations"}
        />
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
            onLongPress={(minItem: Item | undefined) => {
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
