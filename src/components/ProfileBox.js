import React, { useContext, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";

import { useQuery, useMutation } from "@apollo/client";
import { AuthContext } from "../context/auth";
import TextField from "@material-ui/core/TextField";

import { ALL_POSTS, GET_USER, CREATE_POST } from "../util/graphql";

//GQL

const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  ProfileBox: {
    display: "flex",
    backgroundColor: "#303030",
    width: "90%",
    margin: 10,
    borderRadius: "50px",
    background: "linear-gradient(145deg, #3b3b3b, #474747)",
    boxShadow: "16px 16px 32px #383838, -16px -16px 32px #4c4c4c",
    justifyContent: "center",
    flexWrap: "wrap",
    textAlign: "center",
  },
  mainTitle: {
    width: "100%",
    margin: 5,
  },
  username: {
    borderBottom: "solid 1px #24DB83",
    margin: 5,
    width: "100%",
  },
  joined: {
    margin: 5,
    width: "100%",
  },
  button: {
    margin: 20,
    borderRadius: "10px",
    background: "linear-gradient(145deg, #474747, #3b3b3b)",
    boxShadow: "1px 1px 1px #2e2e2e,-1px -1px 1px #565656",
    fontWeight: "bolder",
    marginLeft: "30%",
    marginRight: "30%",
  },
  textBox: {
    width: "75%",
    margin: 10,
  },
  postFormArea: {
    width: "90%",
    // border: "1px solid #24DB83",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    borderRadius: "50px",
    background: "linear-gradient(145deg, #474747, #3b3b3b)",
    boxShadow: "2px 2px 0px #2e2e2e,-2px -2px 0px #565656",
    margin: "20px",
  },
}));

function ProfileBox({ user }) {
  const classes = styles();
  const context = useContext(AuthContext);
  const userId = context.user.id;

  //stateVars
  const [errors, setErrors] = useState();

  const [postValues, setPostValues] = useState({
    header: "",
    body: "",
  });

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId },
  });

  const [createPost] = useMutation(CREATE_POST, {
    update(proxy, result) {
      console.log(result);
      const proxyData = proxy.readQuery({
        query: ALL_POSTS,
      });
      let newData = [...proxyData.getPosts];
      newData = [result.data.createPost, ...newData];
      proxy.writeQuery({
        query: ALL_POSTS,
        data: {
          ...proxyData,
          getPosts: {
            newData,
          },
        },
      });
      postValues.header = "";
      postValues.body = "";
    },
    onError(err) {
      setErrors(err.message);
    },
  });
  //   console.log(user);
  let date = null;

  //functions

  function onSubmit(ev) {
    ev.preventDefault();
    createPost({ variables: postValues });
    setErrors();
  }

  function onChange(ev) {
    setPostValues({ ...postValues, [ev.target.name]: ev.target.value });
  }

  if (loading) {
    return <LinearProgress color={"primary"} />;
  }
  if (error) {
    return <div>ERROR{console.log(error)}</div>;
  }

  if (data) {
    user.createdAt = data.getUser.createdAt;

    date = user.createdAt.substring(0, 10);

    return (
      <div className={classes.root}>
        <div className={classes.ProfileBox}>
          <Typography variant="h3" component="h4" className={classes.mainTitle}>
            {"Howdy:  "}
          </Typography>
          <Typography variant="h4" component="h5" className={classes.username}>
            {user.username}
          </Typography>
          <Avatar
            style={{
              backgroundColor: "#FF4E00",
              border: "1px solid white",
              color: "white",
              margin: 10,
            }}
          >
            {user.username[0]}
          </Avatar>
          {user.createdAt ? (
            <Typography
              variant="body1"
              component="p"
              className={classes.joined}
            >
              Joined : {date}
            </Typography>
          ) : null}

          <Typography variant="body1" component="p" className={classes.joined}>
            Email : {user.email}
          </Typography>
          <Button
            className={classes.button}
            onClick={() => {
              context.logout();
            }}
          >
            Logout
          </Button>
          <form onSubmit={onSubmit} noValidate className={classes.postFormArea}>
            <TextField
              id="standard-basic"
              label="Title"
              className={classes.textBox}
              name="header"
              value={postValues.header}
              onChange={onChange}
            />
            <TextField
              id="standard-multiline-flexible"
              label="Body"
              className={classes.textBox}
              multiline
              name="body"
              value={postValues.body}
              onChange={onChange}
            />
            <Button className={classes.button} type="submit">
              Create Post
            </Button>
            {errors && (
              <div>
                <ul>
                  <li key={errors} style={{ color: "red" }}>
                    {errors}
                  </li>
                </ul>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}
export default ProfileBox;
