import { connect } from "react-redux";
import MovieDetail from "../components/MovieDetail";

const mapStateToProps = state => {
    return {
        favorites: state.database.favorites
    };

};

export default connect(mapStateToProps)(MovieDetail);
