import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("screen").width;

export default (styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  signUpContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  LoginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textSignUpInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8
  },
  headerContainer: {
    height: 55,
    flexDirection: "row",
    backgroundColor: '#D8EFF8',
  },
  sliderContainer: {
    width: screenWidth,
    height: 240,
    justifyContent: "center",
    alignItems: "center"
  },
  carouselContainer: {
    position: "absolute",
    left: 0,
    top: 0
  },
  pagination: {
    position: "absolute",
    bottom: 0,
    left: screenWidth * 0.24
  },
  flex1: {
    flex: 1
  },
  categoryItemContainer: {
    flex: 1,
    padding: 3
  },
  categoryLabelPanel: {
    flexDirection: "row",
    alignItems: "center"
    // justifyContent: "space-between"
  },
  categoryText: {
    fontSize: 20,
    color: "gray"
  },
  categoryIcon: {
    fontSize: 23,
    color: "gray",
    marginLeft: 3
  },
  imagePoster: {
    width: 120,
    height: 165
  },
  movieItemContainer: {
    flex: 1,
    padding: 3
  },
  scrollView: {
    paddingBottom: 20,
    marginBottom: 20
  },
  creditPanel: {
    flexDirection: "row"
  },
  crewPanel: {
    flexDirection: "column",
    flex: 7,
    justifyContent: "flex-start"
  },
  addToFavoritePanel: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  headerLeft: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 8,
    width: 30
  },
  headerCenter: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  headerRight: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 5
  },
  labelScreen: {
    fontSize: 30,
    color: "gray",
    marginLeft: 90
  },
  iconScreen: {
    fontSize: 30,
    color: "gray"
  },
  iconSearch: {
    fontSize: 35,
    color: "gray",
    marginRight: 11
  },
  iconClear: {
    fontSize: 35,
    color: "gray",
    marginRight: 11,

  },
  iconClearContainer: {
    position: 'absolute',
    top: 10,
    right: -6,
  },
  itemSearchContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    paddingHorizontal: 8
  },
  listResults: {
    marginBottom: 50
  },
  bottomOfSearch: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  noResultContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textNoResult: {
    fontSize: 20
  }
}));
