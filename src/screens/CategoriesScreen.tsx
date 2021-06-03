import * as React from "react";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import Question from "../components/Question";
import { categories } from "../constants/Categories";
import { buttonStyles } from "../styles/buttons";
import { white } from "../styles/colors";

export default function InterestScreen(navigation: any) {
  var interestButtons: any[] = [];

  let gifteeInterests = new Set();

  categories.forEach((element) => {
    const [highlightButton, setHighlightButton] = React.useState(true);

    interestButtons.push(
      <Pressable
        style={
          highlightButton
            ? buttonStyles.blackCenteredDiminish
            : buttonStyles.blackCenteredFull
        }
        onPress={() => {
          gifteeInterests.add({ element });
          setHighlightButton(!highlightButton);
          gifteeInterests.delete({ element });
        }}
      >
        <Text style={white}>{element}</Text>
      </Pressable>
    );
  });

  return (
    <View style={styles.viewCentered}>
      <Question questionText={"What's their interest"} />
      {interestButtons}
      <Pressable
        style={buttonStyles.blackCenteredFull}
        onPress={() => {
          // send post request to backend server
          navigation.navigate("Interest");
        }}
      >
        <Text style={white}>Let's go</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  viewCentered: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
