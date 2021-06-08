import * as React from "react";
import { View, Text, Pressable } from "react-native";
import Question from "../../../components/Question";
import { buttonStyles } from "../../../styles/buttons";
import { white } from "../../../styles/Colors";
import { useState } from "react";
import {
  genGenders,
  genRelationships,
  genButton,
} from "../../../classes/GeneratingFunctions";
import { styles } from "../../../styles/quiz";

export default function RecipientContextScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [isLoading, setIsLoading] = useState(false);

  var gender = "";
  var relationships = "";

  // TODO: unselect other options after selection
  return (
    <View style={styles.viewCentered}>
      <Question
        questionText={"What gender does the recipient identify with?"}
      />
      <View style={styles.space} />
      <View style={styles.list}>
        {genGenders().map((data) =>
          genButton({ ...data, onPress: () => (gender = data.title) })
        )}
      </View>
      <View style={styles.space} />
      <Question
        questionText={
          "What best describes your relationship with the recipient?"
        }
      />
      <View style={styles.space} />
      <View style={styles.list}>
        {genRelationships().map((data) =>
          genButton({ ...data, onPress: () => (relationships = data.title) })
        )}
      </View>
      <View style={styles.space} />
      <Pressable
        onPress={() => {
          route["params"]["gender"] = gender;
          route["params"]["relationship"] = relationships;
          navigation.navigate("Occasions", route);
        }}
        style={buttonStyles.blackCenteredFull}
      >
        <Text style={{ color: white }}>Let's go</Text>
      </Pressable>
    </View>
  );
}
