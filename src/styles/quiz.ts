import { StyleSheet, View, Text, Button, Pressable } from "react-native";

export const styles = StyleSheet.create({
  subtext: {
    margin: 5,
    width: "70%",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "roboto-thin",
  },
  heading2: {
    fontFamily: "roboto-light",
  },
  viewCentered: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  scrollable: {
    width: "100%",
    backgroundColor: "white",
    marginBottom: 70,
  },
  scrollableNoMargin: {
    width: "100%",
    backgroundColor: "white",
  },
  seperator: {
    width: "60%",
    height: 1,
    margin: 5,
    backgroundColor: "black",
  },
  input: {
    width: "90%",
    height: 40,
    margin: 5,
    borderWidth: 1,
    paddingLeft: 10,
  },
  button: {
    width: "90%",
    height: 40,
    margin: 5,
    borderWidth: 1,
    paddingLeft: 10,
  },
  row: { 
    flexDirection: "row", 
    width: "95%", 
    justifyContent: "space-between" 
  },
  space: {
    width: 20,
    height: 20,
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  tag: {
    height: 40,
    marginVertical: 5,
    marginHorizontal: 3,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  tagChosen: {
    height: 40,
    marginVertical: 5,
    marginHorizontal: 3,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
