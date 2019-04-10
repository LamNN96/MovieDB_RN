import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Header from './Header';
import firebase from 'react-native-firebase';
import { FlatList } from 'react-native-gesture-handler';
import ItemSearch from './ItemSearch';
import _ from 'lodash';

export default class Favourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      favouriteMovies: []
    };
  }

  componentDidMount() {
    const self = this;
    const favouritesRef = firebase.firestore().collection('favourites');
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const docRef = favouritesRef.doc(user._user.uid).collection('movies');
        docRef.get().then(querySnapshot => {
          let data = self.state.favouriteMovies;
          querySnapshot.forEach(doc => {
            if (!_.find(data, item => item.id == doc.data().data.id)) {
              data.push(doc.data().data)
            }
          })
          self.setState({ favouriteMovies: data })
        }).catch(function (error) {
          console.log("Error getting document:", error);
        });
        self.setState({ user: user._user })
      } else {
        self.props.navigation.navigate("Login")
      }
    });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => (
    <ItemSearch navigation={this.props.navigation} item={item} index={index} />
  );


  render() {
    const { user, favouriteMovies } = this.state;
    console.log(favouriteMovies)
    return (
      <View>
        <Header isHome={false} title="FAVOURITE" navigation={this.props.navigation} />
        {user != null && <Text>Hi {user.email}</Text>}
        <FlatList
          data={favouriteMovies}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          style={styles.listResults}
        />
      </View>
    );
  }
}
