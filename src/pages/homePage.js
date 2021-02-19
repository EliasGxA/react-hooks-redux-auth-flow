import React from "react";
import { Link } from "react-router-dom";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  subtitle: {
    color: "#696969",
  },

  links: {
    textDecorationLine: "none",
  },
});

const HomePage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Nice App</h1>
      <h3 className={classes.subtitle}> Click below to join us </h3>

      <Link className={classes.links} to="/login">
        <Button variant="contained" color="primary">
          Get Started
        </Button>
      </Link>
    </div>
  );
};

export default HomePage;
