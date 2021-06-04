import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View ,Image} from "react-native";

export default function LoadingScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/loadingPresent.gif')} />
      <Text style={styles.title}>Finding Suggestions...</Text>
      <Text style={styles.description}>please wait as we find the most personal gift suggestions</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
  },
  description: {
    fontSize: 13,
    textAlign: "center",
    fontFamily: "roboto-light"
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: "stretch"
  },
});
