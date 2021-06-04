import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  Pressable,
  Dimensions,
  Image,
} from "react-native";
import Suggestion from "../components/Suggestion";
// import { FlatGrid } from "react-native-super-grid";

export default function SuggestionScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const {} = route.params;
  return (
    <View>
      <ScrollView style={stylesGrid.scrollContainer}>
        <View style={stylesGrid.sectionContainer}>
          <View style={stylesGrid.boxContainer}>
            <Image source={{ uri: url }} />
          </View>
          <View style={stylesGrid.boxContainer}>
            <Text>B2</Text>
          </View>
          <View style={stylesGrid.boxContainer}>
            <Text>B3</Text>
          </View>
          <View style={stylesGrid.boxContainer}>
            <Text>B4</Text>
          </View>
          <View style={stylesGrid.boxContainer}>
            <Text>B5</Text>
          </View>
          <View style={stylesGrid.boxContainer}>
            <Text>B6</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const rows = 3;
const cols = 2;
const marginHorizontal = 4;
const marginVertical = 4;
const width =
  Dimensions.get("window").width / cols - marginHorizontal * (cols + 1);
const height =
  Dimensions.get("window").height / rows - marginVertical * (rows + 1);

const stylesGrid = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  sectionContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  boxContainer: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gold",
  },
});

const styles = StyleSheet.create({
  viewCentered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
