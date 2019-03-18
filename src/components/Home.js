import React, { Component } from "react";
import { View, Text } from "react-native";
import firebase from "react-native-firebase";
import _ from "lodash";
import { movieApi, configuration, apiKey } from "../configs/constants";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popular: []
    };
  }

  componentDidMount() {
    // const { currentUser } = firebase.auth();
    let formData = new FormData();
    formData.append("api_key", apiKey);
    formData.append("language", "en-US");
    formData.append("page", "1");
    const api = `${movieApi}${configuration.movieCategory.popular}`;
    fetch(api, {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(responseJson => {
        const popular = responseJson.results;
        const movieSliders = popular;
        this.setState({
          popular: responseJson.results
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    console.log(this.props);
    return (
      <View>
        <Text> home </Text>
      </View>
    );
  }
}
