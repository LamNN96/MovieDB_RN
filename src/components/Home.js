import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
  ScrollView
} from "react-native";
import firebase from "react-native-firebase";
import _ from "lodash";
import {
  movieApi,
  configuration,
  apiKey,
  categories
} from "../configs/constants";
import Header from "./Header";
import Carousel, { Pagination } from "react-native-snap-carousel";
import ItemCarousel from "./ItemCarousel";
import styles from "../themes/default/styles";
import { FlatList } from "react-native-gesture-handler";
import ItemCategory from "./ItemCategory";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieSliders: [],
      activeSlide: 0,
      data: categories,
      isLoadingSliders: true
    };
    this.screenWidth = Dimensions.get("window").width;
  }

  componentDidMount() {
    let data = _.map(this.state.data, item => {
      let formData = new FormData();
      formData.append("api_key", apiKey);
      formData.append("language", "en-US");
      formData.append("page", "1");
      const api = `${movieApi}${item.url}`;
      fetch(api, {
        method: "POST",
        body: formData
      })
        .then(response => response.json())
        .then(responseJson => {
          const data = responseJson.results;
          item.url == "popular"
            ? this.setState({
              movieSliders: data.slice(0, 5),
              isLoadingSliders: false
            })
            : null;
          item.data = data;
          item.isLoading = false;
        })
        .catch(e => {
          console.log(e);
        });
      return item;
    });
    this.setState({ data });
  }

  _renderItem = ({ item, index }) => (
    <ItemCarousel
      navigation={this.props.navigation}
      index={index}
      item={item}
    />
  );

  keyExtractor = (item, index) => index.toString();

  renderCategoryItem = ({ item, index }) => (
    <ItemCategory
      navigation={this.props.navigation}
      item={item}
      index={index}
    />
  );

  render() {
    const { movieSliders, activeSlide, data, isLoadingSliders } = this.state;
    return (
      <View>
        <Header isHome={true} title="MOVIE+" navigation={this.props.navigation} />
        <ScrollView style={styles.scrollView}>
          <View style={styles.sliderContainer}>
            {isLoadingSliders ? (
              <ActivityIndicator size="small" color="#00ff00" />
            ) : (
                <View>
                  <Carousel
                    ref={c => {
                      this._carousel = c;
                    }}
                    style={styles.carouselContainer}
                    data={this.state.movieSliders}
                    renderItem={this._renderItem}
                    sliderWidth={this.screenWidth}
                    itemWidth={this.screenWidth}
                    autoplay={true}
                    // autoplayDelay={200}
                    // autoplayInterval={2000}
                    loop={true}
                    onSnapToItem={index => this.setState({ activeSlide: index })}
                  />
                  <Pagination
                    dotsLength={movieSliders.length}
                    activeDotIndex={activeSlide}
                    containerStyle={styles.pagination}
                    dotStyle={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      marginHorizontal: 8,
                      backgroundColor: "rgba(255, 255, 255, 0.92)"
                    }}
                    inactiveDotStyle={
                      {
                        // Define styles for inactive dots here
                      }
                    }
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                  />
                </View>
              )}
          </View>
          <FlatList
            style={{ marginBottom: 40 }}
            data={data}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderCategoryItem}
          />
        </ScrollView>
      </View>
    );
  }
}
