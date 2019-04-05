import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Header from './Header';

export default class Favourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <View>
        <Header isHome={false} title="FAVOURITE" navigation={this.props.navigation} />

        <Text> favourite </Text>
      </View>
    );
  }
}
