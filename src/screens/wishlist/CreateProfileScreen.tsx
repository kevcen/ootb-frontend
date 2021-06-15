import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  Button,
  Platform,
} from "react-native";
import Question from "../../components/Question";
import MultipleOptionQuestion from "../../components/Quiz/MultipleOptionQuestion";
import QuizNavigator from "../../components/Quiz/QuizNavigator";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { styles } from "../../styles/quiz";
import { Avatar, Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import Product from "../../interfaces/Product";
import PrimaryButton from "../../components/PrimaryButton";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { black, primary } from "../../styles/Colors";
import PrimaryButtonStyles from "../../styles/PrimaryButtonStyles";
import AvatarUpload from "../../components/User/AvatarUpload";
import PrimaryText from "../../components/PrimaryText";
import PrivatePublicToggler from "../../components/User/PrivatePublicToggler";
import CountryPicker, {
  Country,
  CountryCode,
  TranslationLanguageCodeList,
} from "react-native-country-picker-modal";
import { Picker } from "native-base";
import ErrorText from "../../components/ErrorText";
import LoadingData from "../../components/LoadingData";
import FormData from "form-data";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import axios from "axios";
import { API_URL } from "react-native-dotenv";

export default function CreateProfileScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
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

  const [isLoading, setLoading] = useState(false);

  function createProfile(
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
    data.append("firstname", firstName);
    data.append("lastname", lastName);
    data.append("isPublic", isPublic);
    if (country) {
      data.append("countryCode", country.cca2);
    }
    if (profileImage) {
      data.append("image", {
        name: `${Date.now()}`,
        type: "image/*",
        uri:
          Platform.OS === "android"
            ? profileImage.uri
            : profileImage.uri.replace("file://", ""),
      });
    }
    /* End Creation */
    setLoading(true);
    /* Post Data */
    axios
      .post(`${API_URL}/users`, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("Successfully created your profile");
      })
      .catch((error) => {
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
          initials={firstName[0] + lastName[0]}
          default={countryCode}
          onFileChange={(image: ImageInfo) => setProfileImage(image)}
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
