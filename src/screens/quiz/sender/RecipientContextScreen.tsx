import * as React from "react";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import Question from "../../../components/Question";
import genders from "../../../constants/Genders";
import relationships from "../../../constants/Relationships";
import { buttonStyles } from "../../../styles/buttons";
import { black, green, white } from "../../../styles/Colors";
import axios from "axios";
import { useState } from "react";
import { Icon } from "react-native-elements";
import LoadingData from "../../../components/LoadingData";

let genGenders = (): any[] => {
  var data = new Array();
  genders.forEach((genderName, index) => {
    data.push({ key: "cat_" + index, title: genderName });
  });
  return data;
};

let genRelationships = (): any[] => {
  var data = new Array();
  relationships.forEach((relationshipName, index) => {
    data.push({ key: "cat_" + index, title: relationshipName });
  });
  return data;
};

function getRandomColor(): string {
  var color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
  return color;
}

const genButton = ({
  onPress,
  title,
  key,
}: {
  onPress: (title: string) => any;
  title: string;
  key: string;
}) => {
  const [isToggled, setIsToggled] = useState(false);
  const [randomColor, setRandomColor] = useState(
    StyleSheet.create({
      color: { backgroundColor: getRandomColor() },
    })
  );

  const randomColorTagChosen = [styles.tagChosen, randomColor.color];

  const randomColorTag = [styles.tag, randomColor.color];

  return (
    <Pressable
      key={key}
      style={isToggled ? randomColorTagChosen : randomColorTag}
      onPress={() => {
        setIsToggled(!isToggled);
        onPress(title);
      }}
    >
      <Text style={{ color: black }}>{title} </Text>
    </Pressable>
  );
};

export default function RecipientContextScreen({
  navigation,
}: {
  navigation: any;
}) {
  const [isLoading, setIsLoading] = useState(false);

  var gender = "";
  var relationships = "";

  // TODO: unselect other options after selection
  return (
    <View style={styles.viewCentered}>
      <Question
        questionText={"What gender does the recipient identify with?"}
      />
      <View style={styles.space} />
      <View style={styles.list}>
        {genGenders().map((data) =>
          genButton({ ...data, onPress: () => (gender = data.title) })
        )}
      </View>
      <View style={styles.space} />
      <Question
        questionText={
          "What best describes your relationship with the recipient?"
        }
      />
      <View style={styles.space} />
      <View style={styles.list}>
        {genRelationships().map((data) =>
          genButton({ ...data, onPress: () => (relationships = data.title) })
        )}
      </View>
      <View style={styles.space} />
      <Pressable
        onPress={() => {
          navigation.navigate("Occasions");
        }}
        style={buttonStyles.blackCenteredFull}
      >
        <Text style={{ color: white }}>Let's go</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  viewCentered: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  space: {
    width: 20,
    height: 20,
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  tag: {
    height: 40,
    marginVertical: 5,
    marginHorizontal: 3,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.4,
  },
  tagChosen: {
    height: 40,
    marginVertical: 5,
    marginHorizontal: 3,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
  },
});
