import * as React from "react";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import Question from "../components/Question";
import { categories } from "../constants/Categories";
import { buttonStyles } from "../styles/buttons";
import { white } from "../styles/colors";

export default function CategoriesScreen({ navigation }: { navigation: any }) {
  var categoryButtons: any[] = [];

  let gifteeInterests = new Set();

  var noButtonsPerRow = 2;

  // To make 2 buttons side by side, flexing downwards
  for (var i = 0; i < categories.length; i++) {
    var row = [];
    for (var j = 0; j < noButtonsPerRow && i * 2 + j < categories.length; j++) {
      const [isHighlighted, setHighlightButton] = React.useState(false);

      var categoryName: string = categories[i * 2 + j];

      row.push(
        <Pressable
          style={
            isHighlighted
              ? buttonStyles.blackCenteredFull
              : buttonStyles.blackCenteredDiminish
          }
          onPress={() => {
            if (!isHighlighted) {
              gifteeInterests.add({ categoryName });
              setHighlightButton(!isHighlighted);
            } else {
              gifteeInterests.delete({ categoryName });
              setHighlightButton(!isHighlighted);
            }
          }}
        >
          <Text style={white}>{categoryName} </Text>
        </Pressable>
      );
    }

    var rowView = <View style={{ flexDirection: "row" }}>{row}</View>;
    categoryButtons.push(rowView);
  }

  return (
    <View style={styles.viewCentered}>
      <Question questionText={"What categories interest them?"} />
      {categoryButtons}
      <View style={styles.space} />
      <Pressable
        style={buttonStyles.blackCenteredFull}
        onPress={() => {
          // send post request to backend server
          navigation.navigate("Categories");
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
  space: {
    width: 20,
    height: 20,
  },
});
