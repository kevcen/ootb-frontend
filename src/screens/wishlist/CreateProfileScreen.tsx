import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import Question from "../../components/Question";
import { styles } from "../../styles/quiz";
import Product from "../../interfaces/Product";
import PrimaryButton from "../../components/PrimaryButton";
import PrimaryButtonStyles from "../../styles/PrimaryButtonStyles";
import AvatarUpload from "../../components/User/AvatarUpload";
import PrivatePublicToggler from "../../components/User/PrivatePublicToggler";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import ErrorText from "../../components/ErrorText";
import LoadingData from "../../components/LoadingData";
import FormData from "form-data";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import axios from "axios";
import Constants from "expo-constants";
import mime from "mime";

export default function CreateProfileScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const interests: String[] = route.params?.interests;
  const orderedWishlist: Product[] = route.params?.wishlist;
  const [countryCode, setCountryCode] = useState<CountryCode>("GB");
  const [profileImage, setProfileImage] = useState<ImageInfo>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState<Country>();
  const [isCountryPickerOpen, setIsCountryPickerOpen] = useState(false);
  const [isPublic, setPublic] = useState(true);
  const [countryError, setCountryError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [update, forceUpdate] = useState(false);

  const [isLoading, setLoading] = useState(false);
  var userId: number | null = null;

  async function createProfile(
    interests: String[],
    wishlist: Product[],
    profileImage: ImageInfo | undefined,
    firstName: string,
    lastName: string,
    country: Country | undefined,
    isPublic: boolean
  ) {
    /* Create form data */
    let data = new FormData();
    data.append("wishlist", JSON.stringify(wishlist));
    data.append("interests", JSON.stringify(interests));
    data.append("firstname", firstName);
    data.append("lastname", lastName);
    data.append("isPublic", isPublic);
    if (country) {
      data.append("countryCode", country.cca2);
    }
    if (profileImage) {
      let localUri = profileImage.uri;

      if (Platform.OS === "web") {
        let blob = dataURItoBlob(localUri);
        data.append("image", blob);
      } else {
        let filename = localUri.split("/").pop() || `${Date.now()}.jpg`;
        // Infer the type of the image
        let type = mime.getType(localUri);
        data.append("image", {
          uri: localUri,
          type,
          name: filename,
        });
      }
    }
    /* End Creation */
    setLoading(true);
    /* Post Data */
    axios
      .post(`https://gift-recommender-api.herokuapp.com/users`, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        userId = response.data.id;
        alert("Successfully created your profile");
        navigation.navigate("SendEmail", {userId});
      })
      .catch((error) => {
        console.log(error);
        navigation.navigate("Error", { error });
      })
      .finally(() => setLoading(false));
  }

  function onSelect(country: Country) {
    setCountryCode(country.cca2);
    setCountry(country);
    setCountryError(false);
  }

  function checkForm(): boolean {
    var passed = true;
    if (!country) {
      setCountryError(true);
      passed = false;
    } else {
      setCountryError(false);
    }

    if (firstName.indexOf(" ") >= 0) {
      setFirstNameError(true);
      passed = false;
    } else {
      setFirstNameError(false);
    }

    if (lastName.indexOf(" ") >= 0) {
      setLastNameError(true);
      passed = false;
    } else {
      setLastNameError(false);
    }

    return passed;
  }

  if (isLoading) {
    return <LoadingData />;
  }

  return (
    <View style={styles.viewCentered}>
      <ScrollView
        style={styles.scrollableNoMargin}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Question questionText={"Create your profile"} />
        <View style={styles.space} />
        <AvatarUpload
          image={profileImage?.uri}
          initials={(firstName[0] ?? "G") + (lastName[0] ?? "B")}
          onFileChange={(image: ImageInfo) => {
            setProfileImage(image);
            forceUpdate(!update);
          }}
        />
        <View style={styles.space} />
        <View style={styles.row}>
          <View style={{ width: "50%" }}>
            <ErrorText text={"*Required"} />
            <TextInput
              maxLength={255}
              placeholder={"First Name"}
              style={[
                styles.input,
                { borderColor: firstNameError ? "red" : "black" },
              ]}
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text);
                setFirstNameError(false);
                forceUpdate(!update);
              }}
            />
          </View>
          <View style={{ width: "50%" }}>
            <ErrorText text={"*Required"} />
            <TextInput
              maxLength={255}
              placeholder={"Last Name"}
              style={[
                styles.input,
                { borderColor: lastNameError ? "red" : "black" },
              ]}
              value={lastName}
              onChangeText={(text) => {
                setLastName(text);
                setLastNameError(false);
                forceUpdate(!update);
              }}
            />
          </View>
        </View>
        <ErrorText text={"*Required"} />
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                borderColor: countryError ? "red" : "black",
                width: "80%",
                justifyContent: "center",
              },
            ]}
            onPress={() => {
              setIsCountryPickerOpen(true);
            }}
          >
            <Text>{country ? country.name : "Select your country"}</Text>
          </TouchableOpacity>
          <View style={{ justifyContent: "center", margin: 5 }}>
            <CountryPicker
              {...{
                countryCode,
                withFilter: true,
                withEmoji: true,
                withFlag: true,
                onSelect,
                onOpen: () => setIsCountryPickerOpen(true),
                onClose: () => setIsCountryPickerOpen(false),
              }}
              visible={isCountryPickerOpen}
            />
          </View>
        </View>
        <View style={styles.space} />
        <PrivatePublicToggler
          isPublic={isPublic}
          onToggle={() => setPublic(!isPublic)}
        />
      </ScrollView>
      <PrimaryButton
        style={PrimaryButtonStyles.bottom}
        text={"Create Profile"}
        onPress={() => {
          var passed: boolean = checkForm();
          if (passed) {
            createProfile(
              interests,
              orderedWishlist,
              profileImage,
              firstName,
              lastName,
              country,
              isPublic
            );
          }
        }}
      />
    </View>
  );
}
function dataURItoBlob(dataURI: string) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}
