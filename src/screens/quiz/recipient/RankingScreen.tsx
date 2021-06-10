import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Question from "../../../components/Question";
import MultipleOptionQuestion from "../../../components/Quiz/MultipleOptionQuestion";
import QuizNavigator from "../../../components/Quiz/QuizNavigator";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { styles } from "../../../styles/quiz";
import { Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import Product from "../../../interfaces/Product";
import PrimaryButton from "../../../components/PrimaryButton";

export default function RankingScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const selectedItems: Product[] = [
    {
      name: "KFC",
      image:
        "https://www.joc.com/sites/default/files/field_feature_image/KFC_0.png",
      items: [],
      categories: [],
    },
    {
      name: "Chicken World",
      image:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/08/02/16/chicken-world.jpg?width=990&auto=webp&quality=75",
      items: [],
      categories: [],
    },
    {
      name: "PFC",
      image:
        "https://video-images.vice.com/articles/59cbbf4efd5e413f367cc24c/lede/1506525062815-art-school-chicken-shop-tour.jpeg?crop=1xw:0.7449xh;0xw,0.2087xh&resize=500:*",
      items: [],
      categories: [],
    },
  ]; //route.params?.wishlist;

  const [data, setData] = useState(selectedItems);

  const renderItem = useCallback(
    ({ item, index, drag, isActive }: RenderItemParams<Product>) => {
      return (
        <View style={{ paddingVertical: 5, width: "90%", alignSelf: "center" }}>
          <Pressable
            style={{
              alignItems: "center",
              paddingVertical: 10,
              flexDirection: "row",
              borderWidth: 2,
              borderColor: "#000000",
              borderRadius: 5,
              backgroundColor: "#ffffff",
              elevation: 5,
              shadowColor: "#000000",
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 1,
            }}
            onPressIn={drag}
          >
            <Icon name="drag-indicator" size={30} color="#000000" />
            <Image
              source={{ uri: item.image }}
              style={{
                height: 100,
                width: 100,
              }}
            />
            <Text style={{ padding: 10 }}>{item.name}</Text>
          </Pressable>
        </View>
      );
    },
    []
  );

  return (
    <View style={styles.viewCentered}>
      <ScrollView
        style={styles.scrollableNoMargin}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Question questionText={"Rank your wishlist"} />
        <View style={styles.space} />
        <Text style={{ fontFamily: "roboto-light" }}>Most wanted</Text>
        <View
          style={{
            width: "60%",
            height: 1,
            margin: 5,
            backgroundColor: "#000000",
          }}
        />
        <View style={styles.space} />
        <DraggableFlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.name}${index}`}
          onDragEnd={({ data }) => setData(data)}
          dragItemOverflow={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          containerStyle={{
            width: "100%",
          }}
        />
        <View style={styles.space} />
        <View
          style={{
            width: "60%",
            height: 1,
            margin: 5,
            backgroundColor: "#000000",
          }}
        />
        <Text style={styles.heading2}>Least Wanted</Text>
        <View style={styles.space} />
        <View style={styles.space} />
        <PrimaryButton
          style={{
            bottom: 20,
            width: "80%",
            alignSelf: "center",
          }}
          text={"Create wishlist"}
          onPress={() => {}}
        />
      </ScrollView>
    </View>
  );
}
