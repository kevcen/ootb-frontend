import * as React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Question from "../components/Question";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { Container, Header, Content, Button } from 'native-base';

export default function IntroScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.question}>
      <Question
        questionText={"Please tell us a bit about more about the receiver"}
      />
      <Button
        onPress={() => {
          navigation.navigate("Interest");
        }}
        title="Let's go"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  question: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
