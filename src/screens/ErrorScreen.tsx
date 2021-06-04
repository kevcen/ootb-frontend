import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NotFoundScreen({
  error,
  navigation,
}: {
  error: Error | undefined;
  navigation: any;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oops an error occurred!</Text>
      <Text style={styles.errorText}>{error?.message}</Text>
      <TouchableOpacity
        onPress={() => navigation.replace("Root")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  errorText: {
    fontSize: 15,
    color: "red",
  },
});
