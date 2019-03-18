import { StyleSheet } from "react-native";

export default (styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  signUpContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  LoginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textSignUpInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8
  }
}));
