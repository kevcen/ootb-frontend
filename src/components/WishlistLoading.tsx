import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

export default function WishlistLoading() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{uri: "https://cdn.dribbble.com/users/1514097/screenshots/3550111/wishlist-icon.gif"}}
      />
      <Text style={styles.title}>Loading wishlist</Text>
      <Text style={styles.description}>
        please wait as we gather this user's wishlist..
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    zIndex: 999,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
  },
  description: {
    fontSize: 13,
    textAlign: "center",
    fontFamily: "roboto-light",
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: "stretch",
  },
});
