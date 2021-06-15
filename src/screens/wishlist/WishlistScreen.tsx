import React from "react";
import { View, Image, Text } from "react-native";
import User from "../../interfaces/User";
import { styles } from "../../styles/quiz";

export default function WishlistScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  var user: User = route.params.user;

  return (
    <View style={styles.viewCentered}>
      <View>
        <Image
          source={{ uri: user.image }}
          style={{ height: 100, width: 100 }}
        />
        <Text>
          {user.firstname} {user.lastname}
        </Text>
      </View>
    </View>
  );
}
