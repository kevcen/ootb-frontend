import React from "react";
import { View, Switch, Text } from "react-native";
import { primary } from "../../styles/Colors";

export default (props: {
  isPublic: boolean;
  onToggle: (isPublic: boolean) => any;
}) => {
  return (
    <View style={{ padding: 20, flex: 1, flexDirection: "row", width: "100%" }}>
      <View style={{ flex: 1, flexDirection: "column", width: "20%" }}>
        <Switch
          style={{ alignSelf: "flex-start" }}
          trackColor={{ false: "#000000", true: primary }}
          thumbColor={"#000000"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={props.onToggle}
          value={props.isPublic}
        />
        <Text style={{ textAlign: "left" }}>
          {props.isPublic ? "Public" : "Private"}
        </Text>
      </View>
      <Text style={{ textAlign: "center", fontSize: 16, width: "80%" }}>
        {props.isPublic
          ? "Everyone can see your wishlist"
          : "No one can see your wishlist only your interests"}
      </Text>
    </View>
  );
};
