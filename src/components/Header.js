import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../themes/default/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TextInput } from "react-native-gesture-handler";
import Favourite from "./Favourite";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }
  onBackPress = () => {
    this.props.navigation.goBack('');
  };

  onSearchPress = () => {
    this.props.navigation.navigate('Search')
  }

  onFavouritePress = () => {
    this.props.navigation.navigate('Favourite')
  }

  onTextChange = text => {
    this.setState({ text })
  }

  render() {
    const { isHome, title, onSearchSubmit } = this.props;
    const { text } = this.state;
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.headerLeft}
          onPress={isHome ? this.openMenu : this.onBackPress}
        >
          <Ionicons
            name={isHome ? "md-menu" : "md-arrow-back"}
            style={styles.iconScreen}
          />
        </TouchableOpacity>
        {
          onSearchSubmit ?
            <View style={{ flex: 7, justifyContent: 'flex-start', alignContent: 'center' }}>
              <TextInput
                style={{ flex: 1, fontSize: 20, color: 'gray' }}
                value={this.state.text}
                onChangeText={this.onTextChange}
                underlineColorAndroid="gray"
                onSubmitEditing={() => onSearchSubmit(this.state.text)}
                placeholder="Search movies here..." />
              {
                text != '' &&
                <TouchableOpacity style={styles.iconClearContainer} onPress={() => this.setState({ text: '' })}>
                  <MaterialIcons name='clear' style={styles.iconClear} />
                </TouchableOpacity>
              }
            </View>
            : <View style={{ flex: 7, flexDirection: 'row', }}>
              <View style={styles.headerCenter}>
                <Text style={styles.labelScreen}>{title}</Text>
              </View>
              {
                title != 'FAVOURITE' ?
                  <View style={styles.headerRight}>
                    <TouchableOpacity onPress={this.onSearchPress}>
                      <Ionicons name="ios-search" style={styles.iconSearch} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onFavouritePress}>
                      <Ionicons name="ios-heart-empty" style={styles.iconScreen} />
                    </TouchableOpacity>
                  </View> :
                  <View style={styles.headerRight} />
              }
            </View>
        }
      </View>
    );
  }
}
