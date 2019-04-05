import React, { Component } from "react";
import { View, Text } from "react-native";
import Header from "./Header";
import { movieApi, searchApi, apiKey } from "../configs/constants";
import Axios from "axios";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import ItemSearch from "./ItemSearch";
import styles from "../themes/default/styles";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: [],
      isLoading: false,
      isNoResult: false
    };
  }

  onSearchSubmit = query => {
    this.setState({ isLoading: true })
    Axios
      .get(searchApi, {
        params: {
          api_key: apiKey,
          language: "en-US",
          query,
          page: "1"
        }
      })
      .then(res => {
        const searchResult = res.data.results.splice(0, 10);
        this.setState({ searchResult, isLoading: false, isNoResult: searchResult.length == 0 });
      })
      .catch(e => {
        console.log(e);
      });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => (
    <ItemSearch navigation={this.props.navigation} item={item} index={index} />
  );

  render() {
    const { searchResult, isNoResult } = this.state;
    return (
      <View>
        <Header isHome={false} title="MOVIE+" navigation={this.props.navigation} onSearchSubmit={this.onSearchSubmit} />
        {isNoResult &&
          <View style={styles.noResultContainer}>
            <Text style={styles.textNoResult}>No result!</Text>
          </View>
        }
        <FlatList
          data={this.state.searchResult}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          style={styles.listResults}
          ListFooterComponent={searchResult.length > 0 ?
            <TouchableOpacity
              style={styles.bottomOfSearch}
            >
              <Text style={styles.textNoResult}>More results...</Text>
            </TouchableOpacity> : null
          }
        />

      </View>
    );
  }
}
