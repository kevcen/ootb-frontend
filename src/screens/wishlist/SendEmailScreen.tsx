import axios from "axios";
import { Button } from "native-base";
import React, { useRef } from "react";
import { useState } from "react";
import { TextInput, View ,StyleSheet, Text, Pressable, TouchableHighlight} from "react-native";
import { API_URL } from "react-native-dotenv";
import PrimaryButton from "../../components/PrimaryButton";
import Question from "../../components/Question";
import { black } from "../../styles/Colors";
import { styles } from "../../styles/quiz";
const nodemailer = require("nodemailer");

export default function SendEmailScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const emails = useRef([""]);
  const [updated, forceUpdate] = useState(false);

  return (
    <View style={styles.viewCentered}>
      <Question questionText={"Share your wishlists via email"} />
      <Text style={styles.subtext}>
        An email will be generated containing your wishlist and can be sent to your friends, family or whoever else!
      </Text>
      <View style={styles.space} />
      {emails.current.map((email, idx) => 
        <TextInput
          key={`email${idx}`}
          autoFocus={email == ""}
          keyboardType="default"
          onChangeText={(text) => {emails.current[idx] = text; forceUpdate(!updated)}}
          style={styles.input}
          textAlign={"center"}
          value={email}
          placeholder="youremail@example.com"
        />
      )}
      <View style={styles.space} />

      <TouchableHighlight
        style={{
          borderColor: black,
          borderRadius: 10,
          borderWidth: 1,
        }}
        onPress={() => {
          emails.current.push("")
          forceUpdate(!updated)
        }}
        ><Text style={{fontSize: 18}}> + </Text></TouchableHighlight>
      
      <View style={styles.space} />

      <PrimaryButton  
        onPress={() => {
          console.log(emails);
          axios.post(
            `https://gift-recommender-api.herokuapp.com/users/sendemail`,
            {
              emailAddresses : emails.current,
              userId : route.params.userId,
            },
            { headers: { "Content-Type": "application/json" } }
          );
          
          alert("Your wishlist has been sent");
        }}
        text={"send email"}
        style={{ marginTop: "auto", marginBottom: 45}}
      />
    </View>
  );
}
