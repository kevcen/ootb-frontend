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
  const selectedItems: Product[] = Array.from(route.params?.products || []);

  // Data is ordered list of priority, first element is highest priority
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
