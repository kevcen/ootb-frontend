import { StyleSheet } from "react-native";

// export const blackCentered = {
//   paddingVertical: 24,
//   paddingHorizontal: 40,
//   borderRadius: 50,
//   elevation: 3,
//   backgroundColor: "black",
//   alignItems: "center",
//   justifyContent: "center",
// };

const diminish = {
  opacity: 0.4,
};

const full = {
  opacity: 0.9,
};

export const buttonStyles = StyleSheet.create({
  blackCenteredFull: {
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.9,
  },
  blackCenteredDiminish: {
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5,
  },
});
