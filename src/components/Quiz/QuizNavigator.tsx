import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { primary } from "../../styles/Colors";

export interface PageData {
  pagename: string;
  params?: any;
}

export default (props: {
  currentpage: PageData,
  navigation: any;
  prev?: PageData;
  next: PageData;
  pagenum: number;
  totalpages: number;
}) => {
  let navigateCancel = () => {
    props.navigation.goBack();
  };

  let navigatePrev = () => {
    props.navigation.navigate(props.prev?.pagename, {
      ...props.currentpage.params,
      ...props.prev?.params,
      nextpage:props.currentpage.pagename,
      pagenum: props.pagenum-1,
      totalpages: props.totalpages,
    });
  };

  let navigateNext = () => {
    props.navigation.navigate(props.next.pagename, {
      ...props.currentpage.params,
      ...props.next.params,
      prevpage:props.currentpage.pagename,
      pagenum: props.pagenum+1,
      totalpages: props.totalpages,
    });
  };

  return (
    <View style={styles.bottomNavbar}>
      <TouchableOpacity onPress={props.prev ? navigatePrev : navigateCancel}>
        <Text style={styles.section}>{props.prev ? "< Back" : "Cancel"}</Text>
      </TouchableOpacity>

      <Text style={styles.section}>
        {props.pagenum + "/" + props.totalpages}
      </Text>

      <TouchableOpacity onPress={navigateNext}>
        <Text style={styles.section}>{"Next >"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavbar: {
    width: "80%",
    padding: 25,
    bottom:0,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
  },
  section: {
    color: primary,
  },
});
