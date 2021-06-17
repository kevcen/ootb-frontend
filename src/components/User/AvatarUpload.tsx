import React, { useEffect, useState } from "react";
import { View, Text, Platform } from "react-native";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import uploadToAnonymousFilesAsync from "anonymous-files";
import PrimaryButton from "../PrimaryButton";

export default (props: {
  image?: string;
  initials: string;
  onFileChange?: (file: ImageInfo) => any;
}) => {
  const [image, setImage] = useState(props.image || "");


  let takeImage = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });


    if (result.cancelled === true) {
      return;
    }

    if (props.onFileChange) {
      props.onFileChange(result);
    }

    setImage(result.uri);
  };

  let pickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need gallery permissions to make this work!");
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.cancelled === true) {
      return;
    }

    if (props.onFileChange) {
      props.onFileChange(result);
    }

    setImage(result.uri);
  };

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Avatar
        size="xlarge"
        rounded
        title={props.initials.toUpperCase()}
        source={props.image ? { uri: props.image } : undefined}
        overlayContainerStyle={{ backgroundColor: "darkgrey" }}
        activeOpacity={0.6}
      />
      <View
        style={{
          flex:1,
          flexDirection:"row",
        }}
      >
        <PrimaryButton style={{margin:10,width:"40%"}} text={"Take a photo"} onPress={takeImage}/>
        <PrimaryButton style={{margin:10, width:"40%"}} text={"Upload a photo"} onPress={pickImage}/>
      </View>
    </View>
  );
};
