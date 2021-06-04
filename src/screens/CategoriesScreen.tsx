import * as React from "react";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import Question from "../components/Question";
import categories from "../constants/Categories";
import { buttonStyles } from "../styles/buttons";
import { black, green, white } from "../styles/colors";
import axios from "axios";
import { useState } from "react";
import { Icon } from "react-native-elements";

let genData = (): any[] => {
  var data = new Array();
  categories.forEach((categoryName, index) => {
    data.push({ key: "cat_" + index, title: categoryName });
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

export default function CategoriesScreen({ navigation }: { navigation: any }) {
  const [chosenCategories, setChosenCategories] = useState(new Set());

  let onTagPress = (title: string) => {
    // toggle chosen category
    if (chosenCategories.has(title)) {
      chosenCategories.delete(title);
    } else {
      chosenCategories.add(title);
    }
  };

  return (
    <View style={styles.viewCentered}>
      <Question questionText={"Which categories would interest them"} />
      <View style={styles.space} />
      <View style={styles.list}>
        {genData().map((data) => genButton({ ...data, onPress: onTagPress }))}
      </View>
      <View style={styles.space} />
      <Pressable
        style={buttonStyles.blackCenteredFull}
        onPress={() => {
          navigation.navigate("Loading");
          axios
            .post("https://gift-recommender-api.herokuapp.com/products", {
              categories: Array.from(chosenCategories),
            })
            .then((response) => {
              navigation.navigate("Recommendations", {
                recommendations: response.data,
              });
            })
            .catch((error) => {
              navigation.navigate("Error", { error });
            });
        }}
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
    height: 50,
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
    height: 50,
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
