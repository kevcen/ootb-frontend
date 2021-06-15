import React from "react";
import { useState } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  ListRenderItem,
  Pressable,
} from "react-native";
import { SearchBar } from "react-native-elements";
import User from "../../interfaces/User";
import { styles } from "../../styles/quiz";
import PrimaryButton from "../../components/PrimaryButton";

export default function SearchScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  var [searchValue, setSearchValue] = useState("");

  var [users, setUsers] = useState([]);

  let renderItem: ListRenderItem<User> = ({
    item,
    index,
  }: {
    item: User;
    index: number;
  }) => {
    return (
      <Pressable
        onPress={() => {}} //  WHERE NAVIGATION SHOULD BE
        style={
          (styles.viewCentered,
          {
            borderColor: "#fff",
            borderWidth: 2,
            borderRadius: 5,
            elevation: 5,
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            margin: 5,
            padding: 10,
          })
        }
      >
        <Image
          source={{ uri: item.image }}
          style={{ height: 125, width: 125, marginBottom: 5 }}
        />
        <Text
          numberOfLines={2}
          style={{
            width: 125,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {item.firstname} {item.lastname}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.viewCentered}>
      <View style={styles.space} />
      <SearchBar
        placeholder="Search here for profile"
        onChangeText={(value) => {
          setSearchValue(value);
          fetch("https://gift-recommender-api.herokuapp.com/users/search", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              searchValue: searchValue,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              setUsers(data);
            });
        }}
        containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
        inputContainerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
        inputStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
        value={searchValue}
        platform="default"
      />
      {users.length == 0 || searchValue == "" ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={styles.space} />
          <PrimaryButton
            onPress={() => {
              navigation.navigate("Sender");
            }}
            text={"Can't find the person? Take a quiz instead."}
            // style={{ marginTop: 50 }}
          />
        </View>
      ) : (
        <FlatList
          numColumns={2}
          style={{
            width: "95%",
            marginTop: 10,
          }}
          columnWrapperStyle={{
            justifyContent: "space-evenly",
          }}
          data={users}
          renderItem={renderItem}
          extraData={users}
        />
      )}
    </View>
  );
}
