import React, { useContext, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Typeography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../context/auth";

import { LOGIN_USER, RESGISTER_USER } from "../util/graphql";

const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  loginRegisterBox: {
    display: "flex",
    backgroundColor: "#303030",
    width: "90%",
    margin: 10,
    borderRadius: 15,
    boxShadow: "inset 0 0 15px black",
    justifyContent: "center",
    flexWrap: "wrap",
  },
}));

function LoginRegister(props) {
  const context = useContext(AuthContext);
  const classes = styles();

  //state Vars
  const [errors, setErrors] = useState({});
  const [login, setLogin] = useState(true);
  const [registerValues, setRegisterValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [loginValues, setLoginValues] = useState({
    username: "",
    password: "",
  });

  //GQL
  const [addUser, registerObject] = useMutation(RESGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });
  const [loginUser, loginObject] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      console.log(userData);
      context.login(userData);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  //functions
  function handleLoginClick() {
    setErrors({});
    setRegisterValues({
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    });
    setLoginValues({
      username: "",
      password: "",
    });
    if (login) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  }

  function onChange(ev) {
    login
      ? setLoginValues({ ...loginValues, [ev.target.name]: ev.target.value })
      : setRegisterValues({
          ...registerValues,
          [ev.target.name]: ev.target.value,
        });
  }

  //submitting for either Register or Login
  function onSubmit(ev) {
    ev.preventDefault();
    console.log(
      "login Values: ",
      loginValues,
      "RegisterValues: ",
      registerValues
    );
    login
      ? loginUser({ variables: loginValues })
          .then((v) => console.log(v))
          .catch((e) => console.log(e))
      : addUser({ variables: registerValues })
          .then((v) => console.log(v))
          .catch((e) => console.log(e));
  }
  if (registerObject.loading || loginObject.loading) {
    return <LinearProgress color={"primary"} />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.loginRegisterBox}>
        {login ? (
          <>
            <Typeography
              variant="h3"
              component="h2"
              style={{ width: "100%", textAlign: "center", margin: 15 }}
            >
              Login
            </Typeography>
            <form onSubmit={onSubmit} noValidate>
              <TextField
                id="standard-password-input"
                label="Username"
                value={loginValues.username}
                onChange={onChange}
                name="username"
                style={{ width: "90%", margin: 10 }}
              />
              <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                name="password"
                value={loginValues.password}
                onChange={onChange}
                autoComplete="current-password"
                style={{ width: "90%", margin: 10 }}
              />
              <Button
                style={{
                  margin: 10,
                  backgroundColor: "#FF4E00",
                  fontWeight: "bolder",
                }}
                type="submit"
              >
                Login
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typeography
              variant="h3"
              component="h2"
              style={{ width: "100%", textAlign: "center", margin: 15 }}
            >
              Register
            </Typeography>
            <form onSubmit={onSubmit} noValidate>
              <TextField
                id="standard-password-input"
                label="Username"
                autoComplete="username"
                name="username"
                onChange={onChange}
                style={{ width: "90%", margin: 10 }}
              />
              <TextField
                id="standard-password-input"
                label="Email"
                type="email"
                name="email"
                onChange={onChange}
                style={{ width: "90%", margin: 10 }}
              />
              <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                name="password"
                onChange={onChange}
                autoComplete="new-password"
                style={{ width: "90%", margin: 10 }}
              />
              <TextField
                id="confirm-password-input"
                label="Confirm Password"
                type="password"
                autoComplete="new-password"
                name="confirmPassword"
                onChange={onChange}
                style={{ width: "90%", margin: 10 }}
              />
              <Button
                style={{
                  margin: 10,
                  backgroundColor: "#FF4E00",
                  fontWeight: "bolder",
                }}
                type="submit"
              >
                Register
              </Button>
            </form>
          </>
        )}
        {Object.keys(errors).length > 0 && (
          <div>
            <ul>
              {Object.values(errors).map((value) => (
                <li key={value} style={{ color: "red" }}>
                  {value}
                </li>
              ))}
            </ul>
          </div>
        )}

        <ButtonGroup
          aria-label="outlined primary button group"
          style={{ margin: 60 }}
        >
          <Button
            style={login ? { color: "#24DB83" } : { color: "white" }}
            onClick={handleLoginClick}
          >
            Login
          </Button>
          <Button
            style={login ? { color: "white" } : { color: "#24DB83" }}
            onClick={handleLoginClick}
          >
            Register
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default LoginRegister;
