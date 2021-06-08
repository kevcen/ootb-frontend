import * as React from "react";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import Question from "../../../components/Question";
import { buttonStyles } from "../../../styles/buttons";
import { black, green, white } from "../../../styles/Colors";
import { useState } from "react";
import occasions from "../../../constants/Occasion";

let genData = (): any[] => {
  var data = new Array();
  occasions.forEach((occasionName, index) => {
    data.push({ key: "occ_" + index, title: occasionName });
  });
  return data;
};

function getRandomColor(): string {
  var color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
  return color;
}

export default function OccasionScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  var [chosenOccasion, setChosenOccasion] = useState("");

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
          if (isToggled) {
            setIsToggled(!isToggled);
            setChosenOccasion("");
          } else if (chosenOccasion === "") {
            setChosenOccasion(title);
            setIsToggled(!isToggled);
          }
        }}
      >
        <Text style={{ color: black }}>{title} </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.viewCentered}>
      <Question questionText={"What is the occasion, if any?"} />
      <View style={styles.space} />
      <View style={styles.list}>
        {genData().map((data) => genButton({ ...data }))}
      </View>
      <View style={styles.space} />
      <Pressable
        onPress={() => {
          route["params"]["occasion"] = chosenOccasion;
          navigation.navigate("Categories", route);
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
