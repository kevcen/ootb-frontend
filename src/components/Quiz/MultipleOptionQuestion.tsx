import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import TagData from "../../interfaces/TagData";
import SelectableTag from "./SelectableTag";

export default (props: {
  onTagPress: (tagname: string) => any;
  tagdata: TagData[];
}) => {
  const activeTags = useRef(new Set<String>());
  const [updated, forceUpdate] = useState(true);

  return (
    <View style={styles.list}>
      {props.tagdata.map((tag) => (
        <SelectableTag
          key={tag.title}
          title={tag.title}
          subtitle={tag.subtitle}
          onPress={(name) => {
            if(activeTags.current.has(name)){
              activeTags.current.delete(name)
            }else{
              activeTags.current.add(name)
            }
            forceUpdate(!updated)
            props.onTagPress(name);
          }}
          active={activeTags.current.has(tag.title)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    width:"85%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems:"center",
  },
});
