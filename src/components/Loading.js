import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import firebase from "react-native-firebase";
import styles from "../themes/default/styles";

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
