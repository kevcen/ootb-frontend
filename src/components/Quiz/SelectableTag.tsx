import { Button } from "native-base";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
} from "react-native";
import { black, white } from "../../styles/Colors";

function getRandomColor(): string {
  var color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
  return color;
}

export default (props: {
  onPress: (title: string) => any;
  title: string;
  subtitle?: string;
  active?: boolean;
}) => {
  const [randomColor] = useState(getRandomColor());

  return (
    <Button
      style={[
        styles.tag,
        {
          backgroundColor: randomColor,
          borderColor: props.active ? black : white,
          opacity: props.active ? 0.8 : 0.5,
        },
      ]}
      onPress={() => {
        props.onPress(props.title);
      }}
    >
      <Text style={styles.tagTitle}>{props.title} </Text>
      {props.subtitle && (
        <Text style={styles.tagSubtitle}>{props.subtitle}</Text>
      )}
    </Button>
  );
};

const styles = StyleSheet.create({
  tag: {
    height: 40,
    marginVertical: 5,
    marginHorizontal: 3,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
    textAlign: "center",
    justifyContent: "center",
    alignItems:"center",
    flexDirection:"column",
  },
  tagTitle: {
    color: black,
  },
  tagSubtitle: {
    color: black,
    fontSize: 10,
  }
});
