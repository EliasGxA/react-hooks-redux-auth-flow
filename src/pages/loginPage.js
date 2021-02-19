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
import { login } from "../redux/actions/auth.actions";

// routing
import { Redirect } from "react-router-dom";

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
  loginButton: {
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

const LoginPage = (props) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { isNewUser } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const [emailErrTxt, setEmailErrTxt] = useState("");
  const [passErrTxt, setPassErrTxt] = useState("");

  const handleChange = (e, type) => {
    switch (type) {
      case "email":
        setEmail(e.target.value);
        break;
      case "pass":
        setPass(e.target.value);
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
    } else {
      setPassError(false);
      setPassErrTxt("");
    }

    if (!passError && !emailError) {
      // submit
      dispatch(login(email, pass))
        .then(() => {
          props.history.push("/profile");
          window.location.reload();
        })
        .catch(() => {
          // setLoading(false);
        });
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className={classes.outerContainer}>
      {message && (
        <Alert className={classes.alert} severity="error">
          {message}
        </Alert>
      )}

      <div className={classes.innerContainer}>
        <h1>Login</h1>
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

          <Button
            className={classes.loginButton}
            variant="contained"
            color="primary"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Login
          </Button>

          <div className={classes.bottomForm}>
            <p>Create an account: </p>

            <Link to="/signup" className={classes.links}>
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
