import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Question from "../../components/Question";
import MultipleOptionQuestion from "../../components/Quiz/MultipleOptionQuestion";
import QuizNavigator from "../../components/Quiz/QuizNavigator";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { styles } from "../../styles/quiz";
import Icon from "react-native-vector-icons/MaterialIcons";
import Product from "../../interfaces/Product";
import PrimaryButton from "../../components/PrimaryButton";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import PrimaryButtonStyles from "../../styles/PrimaryButtonStyles";
import { primary } from "../../styles/Colors";
import { color } from "react-native-elements/dist/helpers";

export default function RankingScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const selectedItems: Product[] = Array.from(route.params?.products || []);

  // Data is ordered list of priority, first element is highest priority
  const [orderedWishlist, setOrderedWishlist] = useState(selectedItems);
  const [isRead, setRead] = useState(false);

  const renderItem = useCallback(
    ({ item, index, drag, isActive }: RenderItemParams<Product>) => {
      return (
        <TouchableWithoutFeedback
          style={{ padding: 5, width: "95%", alignSelf: "center" }}
          onLongPress={drag}
          delayLongPress={100}
        >
          <View
            style={{
              paddingVertical: 10,
              flexDirection: "row",
              borderWidth: 2,
              borderColor: isActive ? primary : "#ffffff",
              borderRadius: 5,
              backgroundColor: "#ffffff",
              elevation: 5,
              shadowColor: "#000000",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
            }}
          >
            <Icon
              name="drag-indicator"
              size={30}
              color="#000000"
              style={{ alignSelf: "center" }}
            />
            <Image
              source={{ uri: item.image }}
              style={{
                height: 100,
                width: 100,
              }}
            />
            <Text
              style={{ textAlign: "left", width: "55%", margin: 5 }}
              numberOfLines={2}
            >
              {item.name}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    },
    []
  );

  const header = (
    <>
      <Question questionText={"Rank your wishlist"} />
      <Text style={styles.subtext}>
        Hold, drag and drop items to rank from most wanted to least wanted
      </Text>
      <TouchableWithoutFeedback
        onPress={() => setRead(true)}
        style={{ width: "100%", alignItems:"center" }}
      >
        <Text style={[styles.subtext, { color: primary }]}>
          Click once read to collapse
        </Text>
      </TouchableWithoutFeedback>
    </>
  );

  return (
    <View style={styles.viewCentered}>
      <ScrollView
        style={styles.scrollableNoMargin}
        contentContainerStyle={{
          alignItems: "center",
          flex: 1,
        }}
      >
        {!isRead && header}
        <View style={styles.space} />
        <Text style={{ fontFamily: "roboto-light" }}>Most wanted</Text>
        <View style={styles.seperator} />
        <DraggableFlatList
          scrollEnabled={true}
          data={orderedWishlist}
          renderItem={renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.name}${index}`}
          onDragEnd={({ data }) => setOrderedWishlist(data)}
          dragItemOverflow={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{ width: "100%" }}
        />
        <View style={styles.seperator} />
        <Text style={{ fontFamily: "roboto-light" }}>Least Wanted</Text>
        <View style={styles.space} />
        <PrimaryButton
          style={PrimaryButtonStyles.bottom}
          text={"Create wishlist"}
          onPress={() => {
            navigation.navigate("CreateProfile", { wishlist: orderedWishlist });
          }}
        />
      </ScrollView>
    </View>
  );
}
