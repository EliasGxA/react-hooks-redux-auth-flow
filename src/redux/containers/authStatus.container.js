import { connect } from "react-redux";
// import { RootState } from "../reducers/root.reducer"
import { loginUser } from "../actions/user.actions";

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

{
  /*
const mapDispatchToProps = dispatch => { 
	console.log("dispatch")
	// toggleVisibility: ToggleVisibility
	return {
	toggleVisibility: (visibility) => { dispatch(ToggleVisibility(visibility)) }
	}
}
*/
}

const mapDispatchToProps = {
  loginUser: loginUser,
};

const withReduxConnector = connect(mapStateToProps, mapDispatchToProps);

export default withReduxConnector;
