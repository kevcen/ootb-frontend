import * as React from "react";
import { useState } from "react";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import { styles } from "../styles/quiz"
import { black, green, white } from "../styles/Colors";

function getRandomColor(): string {
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