import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import Home from "../components/Home";
import MovieDetail from "../components/MovieDetail";
import Favourite from "../components/Favourite";
import MoreMovie from "../components/MoreMoive";
import Profile from "../components/Profile";
import Search from "../components/Search";
import SideMenu from "../components/SideMenu";
import Login from "../components/Login";
import Loading from "../components/Loading";
import SignUp from "../components/SignUp";

const HomeStack = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    Home: {
      screen: Home
    },
    MovieDetail: {
      screen: MovieDetail
    },
    Favourite: {
      screen: Favourite
    },
    MoreMovie: {
      screen: MoreMovie
    },
    Profile: {
      screen: Profile
    },
    Search: {
      screen: Search
    },
    SignUp: {
      screen: SignUp
    },
    Loading: {
      screen: Loading
    }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      header: null
    }
  }
);

const Drawer = createDrawerNavigator(
  {
    Home: {
      screen: HomeStack
    }
  },
  {
    contentComponent: SideMenu,
    drawerWidth: 300,
    defaultNavigationOptions: {
      drawerLockMode: "locked-closed"
    }
  }
);

export default Drawer;
