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
import Axios from "axios";
import { getData } from "../actions/databaseActions";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieSliders: [],
      activeSlide: 0,
      data: categories,
      isLoadingSliders: true,
      favouriteMovies: []
    };
    this.screenWidth = Dimensions.get("window").width;
  }

  getMoivesData = () => {
    let data = _.map(this.state.data, item => {
      const api = `${movieApi}${item.url}`;
      Axios
        .get(api, {
          params: {
            api_key: apiKey,
            language: "en-US",
            page: "1"
          }
        })
        .then(res => {
          const data = res.data.results;
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

  getFavoriteMovies = () => {
    const self = this;
    const { favourites } = self.props;
    const favouritesRef = firebase.firestore().collection('favourites');
    let favouriteData = favourites ? favourites : [];
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const docRef = favouritesRef.doc(user._user.uid).collection('movies');
        docRef.get().then(querySnapshot => {
          let data = favouriteData;
          querySnapshot.forEach(doc => {
            if (!_.find(data, item => item.id == doc.data().data.id)) {
              data.push(doc.data().data)
            }
          })
          self.props.dispatch(getData(favouriteData))
        }).catch(function (error) {
          console.log("Error getting document:", error);
        });
        self.setState({ user: user._user })
      } else {
        console.log('undefine user')
        // self.props.navigation.navigate("Login")
      }
    });
  }

  componentDidMount() {
    this.getMoivesData();
    this.getFavoriteMovies();
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
