import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { logout } from "../redux/actions/auth.actions";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#696969",
  },
});

const ProfilePage = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const classes = useStyles();

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <div className={classes.container}>
      <h1>Your Profile</h1>
      <Button variant="contained" color="secondary" onClick={() => logOut()}>
        {" "}
        Log Out{" "}
      </Button>
    </div>
  );
};

export default ProfilePage;
