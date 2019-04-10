import { connect } from "react-redux";
import Home from "../components/Home";

const mapStateToProps = state => {
    return {
        favorites: state.database.favorites
    };

};

export default connect(mapStateToProps)(Home);
