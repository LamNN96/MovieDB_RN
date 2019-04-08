import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import Header from "./Header";
import { ScrollView, FlatList, TouchableOpacity } from "react-native-gesture-handler";
import styles from "../themes/default/styles";
import Loading from "./Loading";
import { apiKey, movieApi } from "../configs/constants";
import axios from "axios";
import ItemMovie from "./ItemMovie";
import firebase from "react-native-firebase";
import Toast, {DURATION} from 'react-native-easy-toast'

export default class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedMovies: [],
      isLoading: true
    };
    this.item = this.props.navigation.state.params.item;
    this.ref = firebase.firestore().collection('favourites');
  }

  componentDidMount() {
    const api = `${movieApi}${this.item.id}/similar`;
    axios
      .get(api, {
        params: {
          api_key: apiKey,
          language: "en-US",
          page: "1"
        }
      })
      .then(res => {
        const relatedMovies = res.data.results.splice(0, 10);
        this.setState({ relatedMovies, isLoading: false });
      })
      .catch(e => {
        console.log(e);
      });
  }

  onAddPress = () => {
    const { navigation } = this.props;
    const item = this.item;
    const favouritesRef = this.ref;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        favouritesRef
          .doc(user._user.uid)
          .collection('movies')
          .add({
            data: item
          }).then(doc => {
            const title = item.name
            this.refs.toast.show(`${title} added to your Favourite!`);
          }).catch(err => {
            console.log(err)
          })
      } else {
        navigation.navigate("Login")
      }
    });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => (
    <ItemMovie navigation={this.props.navigation} item={item} index={index} />
  );

  render() {
    const { isLoading, relatedMovies } = this.state;
    const item = this.item;
    return (
      <View>
        <Header isHome={false} title="MOVIE+" navigation={this.props.navigation} />
        <ScrollView>
          <Image
            style={{ height: 240 }}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
            }}
          />
          <Text>{item.title}</Text>
          <Text>{item.overview}</Text>
          <View style={styles.creditPanel}>
            <View style={styles.crewPanel}>
              <Text>Director: </Text>
              <Text>Actor: </Text>
            </View>
            <TouchableOpacity style={styles.addToFavoritePanel} onPress={this.onAddPress}>
              <Text>Add</Text>
            </TouchableOpacity>
          </View>
          <Text>Related</Text>
          {isLoading ? (
            <Loading />
          ) : (
              <FlatList
                data={relatedMovies}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            )}
        </ScrollView>
        <Toast ref="toast"/>
      </View>
    );
  }
}
