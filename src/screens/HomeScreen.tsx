import React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import PrimaryText from "../components/PrimaryText";
import Question from "../components/Question";

export default function HomeScreen({ navigation }: { navigation: any }) {
  const navigateSender = () => {
    navigation.navigate("SenderIntro");
  };

  const navigateReceiver = () => {
    navigation.navigate("RecipientIntro");
  };

  return (
    <View style={styles.home}>
      <View style={styles.header}>
        <Question questionText={"Out Of The Box"} />
        <Text style={styles.intro}>Gifting made simple.</Text>
      </View>
      <View style={styles.body}>
        <PrimaryText text={"Want to"} />
        <PrimaryButton onPress={navigateSender} text={"Find a gift for someone"} />
        <PrimaryText text={"or"} />
        <PrimaryButton text={"Help others find gifts for you"} onPress={navigateReceiver} />
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
    marginVertical: "5%",
  },
});
