import React, { useState } from "react";
import { Link } from "react-router-dom";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";

// helpers
import { validateEmail } from "../helpers/helperFunctions";

// redux
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/auth.actions";

const useStyles = makeStyles({
  outerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "350px",
    paddingBottom: "50px",
    paddingTop: "20px",
    borderStyle: "solid",
    borderWidth: "3px",
    borderColor: "#696969",
    borderRadius: "5px",
    backgroundColor: "rgba(105,105,105,0.1)",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
  },
  links: {
    textDecorationLine: "none",
    marginLeft: "10px",
  },
  textField: {
    marginTop: "10px",
    marginBottom: "10px",
    width: "100%",
  },
  signupButton: {
    width: "100%",
    marginTop: "30px",
    height: "45px",
  },
  bottomForm: {
    width: "90%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  alert: {
    marginBottom: "10px",
    width: "320px",
  },
});

const SignupPage = (props) => {
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [rePass, setRePass] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const [emailErrTxt, setEmailErrTxt] = useState("");
  const [passErrTxt, setPassErrTxt] = useState("");

  const [successful, setSuccessful] = useState(false);

  const handleChange = (e, type) => {
    switch (type) {
      case "email":
        setEmail(e.target.value);
        break;
      case "pass":
        setPass(e.target.value);
        break;
      case "rePass":
        setRePass(e.target.value);
        break;
      default:
        setPass("");
        setEmail("");
    }
  };

  const handleSubmit = (e) => {
    let isValidEmail;

    e.preventDefault();
    console.log("potito");

    isValidEmail = validateEmail(email);

    // check email
    if (email === "") {
      setEmailError(true);
      setEmailErrTxt("email required");
    } else if (!isValidEmail) {
      setEmailError(true);
      setEmailErrTxt("invalid email");
    } else {
      setEmailError(false);
      setEmailErrTxt("");
    }

    if (pass === "") {
      setPassError(true);
      setPassErrTxt("password required");
    } else if (pass !== rePass) {
      setPassError(true);
      setPassErrTxt("passwords do not match");
    } else {
      setPassError(false);
      setPassErrTxt("");
    }

    if (!passError && !emailError) {
      // submit
      dispatch(register(email, pass))
        .then(() => {
          setSuccessful(true);
          props.history.push("/login");
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className={classes.outerContainer}>
      {message && !successful && (
        <Alert className={classes.alert} severity="error">
          {message}
        </Alert>
      )}

      {successful && (
        <Alert className={classes.alert} severity="success">
          {message}
        </Alert>
      )}

      <div className={classes.innerContainer}>
        <h1>Sign up</h1>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            error={emailError}
            helperText={emailErrTxt}
            className={classes.textField}
            required
            id="filled-required"
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => {
              handleChange(e, "email");
            }}
          />

          <TextField
            error={passError}
            helperText={passErrTxt}
            className={classes.textField}
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            value={pass}
            onChange={(e) => {
              handleChange(e, "pass");
            }}
          />
          <TextField
            error={passError}
            //  helperText={passErrTxt}
            className={classes.textField}
            required
            id="outlined-password-input"
            label="Repeat Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            value={rePass}
            onChange={(e) => {
              handleChange(e, "rePass");
            }}
          />

          <Button
            className={classes.signupButton}
            variant="contained"
            color="primary"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Sign up
          </Button>

          <div className={classes.bottomForm}>
            <p>Already have an account? </p>

            <Link to="/login" className={classes.links}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
