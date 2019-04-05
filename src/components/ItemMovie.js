import React, { PureComponent } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "../themes/default/styles";
import _ from "lodash";

const STRING_LIMIT = 15;

export default class ItemMovie extends PureComponent {
  limitTitleString = title => {
    return title.length >= STRING_LIMIT ? `${title.slice(0, STRING_LIMIT)}...` : title;
  };

  onMovieClick = () => {
    const { item, navigation } = this.props;
    navigation.navigate({
      routeName: "MovieDetail",
      params: { item },
      key: item.id
    });
  };

  render() {
    const { index, item } = this.props;
    const { poster_path, title } = item;
    return (
      <TouchableOpacity
        style={styles.movieItemContainer}
        onPress={this.onMovieClick}
      >
        <Image
          style={styles.imagePoster}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${poster_path}`
          }}
        />
        <Text>{this.limitTitleString(title)}</Text>
      </TouchableOpacity>
    );
  }
}
