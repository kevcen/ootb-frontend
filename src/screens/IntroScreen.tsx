import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import Question from "../components/Question";
import { buttonStyles } from "../styles/buttons";
import { white } from "../styles/Colors";

export default function IntroScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.question}>
      <Question 
        questionText={"Out Of The Box"} />
      <Text style={styles.intro}>
        Struggling to find a gift a for someone? Look no further, our brilliant
        AI powered app is able to help you out.
      </Text>
      <View>
        <Image
          style={styles.image}
          source={{
            uri: "https://i.pinimg.com/originals/fd/2c/1a/fd2c1a96b654e220d09525f006482477.gif",
          }}
        />
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate("Sender");
        }}
        style={buttonStyles.blackCenteredFull}
      >
        <Text style={{color:white}}>Let's go</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  question: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  intro: {
    fontSize: 18,
    width: "80%",
    textAlign: "center", 
    fontFamily: "roboto-thin",
  },
  image: {
    width: 200,
    height: 200,
    marginVertical:"10%"
  },
});
