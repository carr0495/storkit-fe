import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import CommentIcon from "@material-ui/icons/Comment";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";

import RandomEmoji from "../components/RandomEmoji";

import { useMutation } from "@apollo/client";
import { DELETE_POST, SET_LIKES, ALL_POSTS } from "../util/graphql";

import Comments from "../components/Comments";
import { graphqlSync } from "graphql";

const useStyles = makeStyles((theme) => ({
  base: {
    display: "flex",
    flexWrap: "wrap",
    width: "90%",
    height: "auto",
    borderRadius: "10px",
    background: "#424242",
    boxShadow: "5px 5px 10px #333333,-5px -5px 10px #444444",
    margin: "5%",
  },
  userContainer: {
    display: "flex",
    width: "100%",
    height: 50,
    padding: 10,
  },
  postHeader: {
    // width: "100%",
    borderBottom: "1px solid #24DB83",
    marginLeft: 15,
    marginRight: 15,
    // textAlign: "center",
    color: "#919191",
  },
  postBody: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    color: "#888888",
  },
  iconBox: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    margin: 20,
    padding: 15,
    // borderTop: "1px solid #999999",
    borderRadius: "15px",
    background: "#424242",
    boxShadow: "inset 6px 6px 8px #2f2f2f,inset -6px -6px 8px #555555",
  },
}));

function PostItem({ post, username }) {
  const classes = useStyles();
  const [showComments, setShowComments] = useState(false);
  const [deletePost] = useMutation(DELETE_POST, {
    update(_, data) {
      console.log(data);
    },
  });
  const [setLikes] = useMutation(SET_LIKES, {
    update(proxy, result) {
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
    },
  });

  async function executeDelete(id) {
    console.log(id);
    if (window.confirm("Are you sure you want to delete?")) {
      await deletePost({ variables: { postId: id } });
      window.location.reload();
    }
  }

  function Like(id) {
    setLikes({ variables: { postId: id } });
  }

  function flipCommentStatus() {
    setShowComments(!showComments);
  }

  return (
    <Paper variant="outlined" className={classes.base}>
      <div className={classes.userContainer}>
        {username === post.username ? (
          <Avatar
            style={{
              backgroundColor: "#FF4E00",
              border: "1px solid white",
              color: "white",
            }}
          >
            {post.username[0]} <RandomEmoji />
          </Avatar>
        ) : (
          <Avatar
            style={{
              backgroundColor: "#24DB83",
              border: "1px solid white",
              color: "white",
            }}
          >
            {post.username[0]}
            <RandomEmoji />
          </Avatar>
        )}
        <Typography
          variant="h5"
          component="h3"
          style={{ marginLeft: 10, color: "#999999" }}
        >
          {post.username}
        </Typography>
      </div>
      <Typography variant="h5" component="h2" className={classes.postHeader}>
        {post.header}
      </Typography>
      <Typography className={classes.postBody}>{post.body}</Typography>

      <div className={classes.iconBox}>
        {username ? (
          <>
            {post.likes.find((like) => like.username === username) ? (
              <Badge badgeContent={post.likeCount} color="primary">
                <IconButton onClick={() => Like(post.id)}>
                  <ThumbUpAltIcon />
                </IconButton>
              </Badge>
            ) : (
              <Badge badgeContent={post.likeCount} color="default">
                <IconButton onClick={() => Like(post.id)}>
                  <ThumbUpAltIcon />
                </IconButton>
              </Badge>
            )}
            <Badge badgeContent={post.commentCount} color="default">
              <IconButton onClick={flipCommentStatus}>
                <CommentIcon />
              </IconButton>
            </Badge>{" "}
          </>
        ) : (
          <>
            <Badge badgeContent={post.likeCount} color="default">
              <IconButton disabled>
                <ThumbUpAltIcon />
              </IconButton>
            </Badge>
            <Badge badgeContent={post.commentCount} color="default">
              <IconButton disabled>
                <CommentIcon />
              </IconButton>
            </Badge>{" "}
          </>
        )}

        {username === post.username ? (
          <IconButton onClick={() => executeDelete(post.id)}>
            <DeleteIcon style={{ color: "red" }} />
          </IconButton>
        ) : null}
      </div>
      {showComments && username ? (
        <Comments comments={post.comments} postId={post.id} />
      ) : null}
    </Paper>
  );
}
export default PostItem;
