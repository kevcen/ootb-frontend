import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import TagData from "../../constants/TagData";
import SelectableTag from "./SelectableTag";

export default (props: {
  onTagPress: (tagname: string) => any;
  tagdata: TagData[];
}) => {
  const [activeTag, setActiveTag] = useState("");

  return (
    <View style={styles.list}>
      {props.tagdata.map((tag) => (
        <SelectableTag
          key={tag.title}
          title={tag.title}
          subtitle={tag.subtitle}
          onPress={(name) => {
            setActiveTag(name);
            props.onTagPress(name);
          }}
          active={tag.title == activeTag}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});
