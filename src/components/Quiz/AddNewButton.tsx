import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Pressable, TextInput } from "react-native";
import categories from "../../constants/Categories";
import TagData from "../../interfaces/TagData";
import SelectableTag from "../Quiz/SelectableTag";

export default ({ setCats }: { setCats: any }) => {
  const [text, onChangeText] = React.useState("");
  const [currentlyWriting, setCurrentlyWriting] = useState(false);

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Pressable
        onPress={() => {
          setCurrentlyWriting(!currentlyWriting);
        }}
      >
        {currentlyWriting ? (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <TextInput
              autoFocus={true}
              keyboardType="default"
              onChangeText={onChangeText}
              style={styles.input}
              onSubmitEditing={() => {
                setCats({ title: text });
                setCurrentlyWriting(!currentlyWriting);
                onChangeText("")
              }}
              textAlign={"center"}
              value={text}
            />
          </View>
        ) : (
          <Text>+ Add new</Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "100%",
    display: "flex",
    borderWidth: 0,
    fontSize: 20,
    alignSelf: "center",
  },
});
