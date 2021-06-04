import * as React from "react";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import Question from "../components/Question";
import categories from "../constants/Categories";
import { buttonStyles } from "../styles/buttons";
import { black, green, white } from "../styles/colors";
import axios from "axios";
import { useState } from "react";
import { Icon } from "react-native-elements";
import LoadingData from "../components/LoadingData";

let genData = (): any[] => {
  var data = new Array();
  categories.forEach((categoryName, index) => {
    data.push({ key: "cat_" + index, title: categoryName });
  });
  return data;
};

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
  return (
    <Pressable
      key={key}
      style={isToggled ? styles.tagChosen : styles.tag}
      onPress={() => {
        setIsToggled(!isToggled);
        onPress(title);
      }}
    >
      <Text style={{ color: isToggled ? black : white }}>{title} </Text>
    </Pressable>
  );
};

export default function CategoriesScreen({ navigation }: { navigation: any }) {
  const [chosenCategories, setChosenCategories] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);

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
      {isLoading ? <LoadingData /> : null}
      <Question questionText={"Which categories would interest them"} />
      <View style={styles.space} />
      <View style={styles.list}>
        {genData().map((data) => genButton({ ...data, onPress: onTagPress }))}
      </View>
      <View style={styles.space} />
      <Pressable
        style={buttonStyles.blackCenteredFull}
        onPress={() => {
          setIsLoading(true);
          setTimeout(()=>
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
            })
            .finally(() => {
              setIsLoading(false);
            }), 1000)
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
    borderColor: "black",
    backgroundColor: "#101820",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
  },
  tagChosen: {
    height: 50,
    paddingHorizontal: 20,
    marginHorizontal: 6,
    marginVertical: 5,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: green,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
  },
});
