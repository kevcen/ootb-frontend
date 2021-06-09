import * as React from "react";
import { useState } from "react";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import { styles } from "../styles/quiz"
import { black, green, white } from "../styles/Colors";
import genders from "../constants/Genders";
import relationships from "../constants/Relationships";
import giftTypes from "../constants/GiftTypes";
import cuisines from "../constants/Cuisines";
import yesNo from "../constants/YesNo";
import categories from "../constants/Categories";

let generate = (strings: any[], hasSubtitle: boolean): any[] => {
  var data = new Array();
  strings.forEach((string, index) => {
    let title = hasSubtitle ? string[0] : string
    let subtitle = hasSubtitle ? string[1] : ""
    data.push({ key: "cat_" + index, title, subtitle});
  });
  return data;
}

export let genGenders = (): any[] => {
  return generate(genders, false)
};

export let genCuisines = (): any[] => {
  return generate(cuisines, false)
};

export let genCategories = (): any[] => {
  return generate(categories, false)
};

export let genGiftTypes = (): any[] => {
  return generate(giftTypes, true)
};

export let genYesNo = (): any[] => {
  return generate(yesNo, false)
};

export let genRelationships = (): any[] => {
  return generate(relationships, false)
};

export function getRandomColor(): string {
  var color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
  return color;
}

export const genButton = ({
  onPress,
  title,
  subtitle,
  key,
}: {
  onPress: (title: string) => any;
  title: string;
  subtitle: string;
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

  var subtitleText = null;
  if (subtitle) {
    subtitleText = <Text style={{ color: black, fontSize: 10 }}>{subtitle}</Text>
  }

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
      {subtitleText}
        
    </Pressable>
  );
};