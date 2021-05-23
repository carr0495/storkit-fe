import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Button, TextField } from "@material-ui/core";
import { AuthContext } from "../context/auth";
import { ALL_POSTS, CREATE_COMMENT } from "../util/graphql";
import { useMutation } from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  listArea: {
    maxHeight: "150px",
    overflow: "auto",
  },
}));

export default function Comments({ comments, postId }) {
  const classes = useStyles();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState();

  const [commentValues, setCommentValues] = useState({
    body: "",
  });

  const [createComment] = useMutation(CREATE_COMMENT, {
    update(proxy, result) {
      const proxyData = proxy.readQuery({
        query: ALL_POSTS,
      });
      let newData = [...proxyData.getPosts];
      newData = [result.data.createComment, ...newData];
      proxy.writeQuery({
        query: ALL_POSTS,
        data: {
          ...proxyData,
          getPosts: {
            newData,
          },
        },
      });
    },
    onError(err) {
      setErrors(err.message);
    },
  });

  function onSubmit(ev) {
    ev.preventDefault();
    createComment({
      variables: {
        postId: postId,
        body: commentValues.body,
      },
    });
    setCommentValues({
      body: "",
    });
    setErrors();
  }

  function onChange(ev) {
    setCommentValues({ ...commentValues, [ev.target.name]: ev.target.value });
  }

  return (
    <div className={classes.root}>
      <form
        onSubmit={onSubmit}
        noValidate
        style={{
          margin: 0,
          backgroundColor: "#303030",
          zIndex: 10,
        }}
      >
        <TextField
          id="standard-input"
          label="Comment"
          value={commentValues.body}
          onChange={onChange}
          name="body"
          style={{ width: "50%", margin: 10 }}
        />
        <Button
          style={{
            margin: 10,
            backgroundColor: "#FF4E00",
            fontWeight: "bolder",
          }}
          type="submit"
        >
          Comment!
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
      <List className={classes.listArea}>
        {comments.map((comment) => (
          <ListItem
            alignItems="flex-start"
            style={{ borderBottom: "solid 1px #B9B9B9" }}
            key={comment.id}
          >
            <ListItemAvatar>
              {context.user.username === comment.username ? (
                <Avatar
                  style={{
                    backgroundColor: "#FF4E00",
                    border: "1px solid white",
                    color: "white",
                  }}
                >
                  {comment.username[0]}
                </Avatar>
              ) : (
                <Avatar
                  style={{
                    backgroundColor: "#24DB83",
                    border: "1px solid white",
                    color: "white",
                  }}
                >
                  {comment.username[0]}
                </Avatar>
              )}
            </ListItemAvatar>
            <ListItemText
              primary={comment.username}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  ></Typography>
                  {comment.body}
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
