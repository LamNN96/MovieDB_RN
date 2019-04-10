import React, { PureComponent } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styles from "../themes/default/styles";
import { FlatList } from "react-native-gesture-handler";
import ItemMovie from "./ItemMovie";
import _ from 'lodash';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class ItemCategory extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true
    };
  }

  componentWillReceiveProps(nextProps) {
    const { data, isLoading } = nextProps.item;
    this.setState({
      data,
      isLoading
    });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => (
    <ItemMovie navigation={this.props.navigation} item={item} index={index} />
  );

  render() {
    const { title, data, isLoading } = this.props.item;
    return (
      <View style={styles.categoryItemContainer}>
        <View style={styles.categoryLabelPanel}>
          <Text style={styles.categoryText}>{_.upperCase(title)}</Text>
          <FontAwesome name="angle-right" style={styles.categoryIcon}/>
        </View>
        {isLoading ? (
          <ActivityIndicator size="small" color="#00ff00" />
        ) : (
          <FlatList
            style={styles.flex1}
            data={data}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator = {false}
          />
        )}
      </View>
    );
  }
}
