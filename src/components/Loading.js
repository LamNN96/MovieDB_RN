import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import firebase from "react-native-firebase";
import styles from "../themes/default/styles";

export default class Loading extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "Main" : "SignUp");
    });
  }

  render() {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
