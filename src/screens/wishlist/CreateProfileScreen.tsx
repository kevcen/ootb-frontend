import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Question from "../../components/Question";
import MultipleOptionQuestion from "../../components/Quiz/MultipleOptionQuestion";
import QuizNavigator from "../../components/Quiz/QuizNavigator";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { styles } from "../../styles/quiz";
import { Avatar, Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import Product from "../../interfaces/Product";
import PrimaryButton from "../../components/PrimaryButton";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { black } from "../../styles/Colors";

export default function CreateProfileScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const orderedWishlist: Product[] = route.params?.wishlist;
  return (
    <View style={styles.viewCentered}>
      <ScrollView
        style={styles.scrollableNoMargin}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Question questionText={"Create your profile"} />
        <View style={styles.space} />
        <Avatar size="xlarge" title={""}/>
        <PrimaryButton
          style={{
            bottom: 20,
            width: "80%",
            alignSelf: "center",
          }}
          text={"Create Profile"}
          onPress={() => {}}
        />
      </ScrollView>
    </View>
  );
}
