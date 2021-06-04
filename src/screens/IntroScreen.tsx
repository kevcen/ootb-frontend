import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import Question from "../components/Question";
import { buttonStyles } from "../styles/buttons";
import { white } from "../styles/colors";

export default function IntroScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.question}>
      <Question questionText={"Out Of The Box"} />
      <Text style={styles.intro}>
        Struggling to find a gift a for someone. Look no further, our brilliant
        AI powered app is able to help you out.
      </Text>
      <View>
        <Image
          style={styles.image}
          source={{
            uri: "https://image.freepik.com/free-vector/dog-comes-out-box-cartoon-illustration_152710-41.jpg",
          }}
        />
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate("Categories");
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
    flex: 2,
    alignItems: "center",
  },
  intro: {
    marginVertical: 20,
    fontSize: 18,
    width: "80%",
  },
  image: {
    width: 200,
    height: 200,
    marginVertical:"10%"
  },
});
