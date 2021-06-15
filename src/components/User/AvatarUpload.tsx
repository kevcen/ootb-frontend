import React, { useEffect, useState } from "react";
import { View, Text, Platform } from "react-native";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";

const defaultPreview =
  "https://cdn4.iconfinder.com/data/icons/basic-ui-pack-flat-s94-1/64/Basic_UI_Icon_Pack_-_Flat_user-512.png";
export default (props: {
  initials: string;
  default: string;
  onFileChange?: (file: ImageInfo) => any;
}) => {
  const [image, setImage]: any = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      if (props.onFileChange) {
        props.onFileChange(result);
      }
    }
  };

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Avatar
        size="xlarge"
        rounded
        title={
          props.initials.length == 2
            ? props.initials.toUpperCase()
            : props.default
        }
        onPress={pickImage}
        source={
          image && {
            uri: image,
          }
        }
        overlayContainerStyle={{ backgroundColor: "darkgrey" }}
        activeOpacity={0.6}
      />
      <Text
        style={{
          width: "100%",
          textAlign: "center",
          padding: 10,
          fontSize: 18,
        }}
      >
        Tap to upload
      </Text>
    </View>
  );
};
