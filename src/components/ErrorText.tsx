import React from "react";
import { Text } from "react-native";

export default (props: { text: string }) => {
  return <Text style={{color:"red", width:"95%"}}>{props.text}</Text>;
};
