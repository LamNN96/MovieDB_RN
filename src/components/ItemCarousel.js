import React, { PureComponent } from "react";
import { View, Image } from "react-native";

export default class ItemCarousel extends PureComponent {
  render() {
    const { item, index, navigation } = this.props;
    return (
      <View style={styles.slide}>
        <Image
          style={{ height: 240 }}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
          }}
        />
      </View>
    );
  }
}
