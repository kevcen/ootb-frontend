import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import PrimaryText from "../components/PrimaryText";
import Question from "../components/Question";
import { buttonStyles } from "../styles/buttons";
import { white } from "../styles/Colors";

export default function HomeScreen({ navigation }: { navigation: any }) {
  const navigateSender = () => {
    navigation.navigate("Sender", {});
  };

  const navigateReceiver = () => {
    navigation.navigate("Recipient", {});
  };

  return (
    <View style={styles.home}>
      <View style={styles.header}>
        <Question questionText={"Out Of The Box"} />
        <Text style={styles.intro}>Gifting made simple.</Text>
      </View>
      <View style={styles.body}>
        <PrimaryText text={"Are you"} />
        <PrimaryButton onPress={navigateSender} text={"Buying a gift"} />
        <PrimaryText text={"or"} />
        <PrimaryButton text={"Receiving a gift"} onPress={navigateReceiver} />
      </View>
      <View>
        <Image
          style={styles.image}
          source={{
            uri: "https://i.pinimg.com/originals/fd/2c/1a/fd2c1a96b654e220d09525f006482477.gif",
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 6,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    top: 15,
    width: "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  intro: {
    fontSize: 18,
    width: "80%",
    margin: 10,
    textAlign: "center",
    fontFamily: "roboto-thin",
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: "10%",
  },
});
