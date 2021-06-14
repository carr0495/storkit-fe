import React, { useContext } from "react";
import logo from "../images/storkit.png";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";

import { useQuery } from "@apollo/client";

import PostItem from "../components/PostItem";
import LoginRegister from "../components/LoginRegister";
import ProfileBox from "../components/ProfileBox";

import { AuthContext } from "../context/auth";

import { ALL_POSTS } from "../util/graphql";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  paper: {
    width: "45vw",
    height: "100vh",
    // backgroundColor: "#464B49",
    // display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    maxHeight: "100vh",
    overflow: "auto",
  },
  paperC: {
    width: "45vw",
    height: "100vh",
    // backgroundColor: "#464B49",
    // display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  logoBox: {
    display: "flex",
    justifyContent: "center",
    margin: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: "100%",
    marginTop: 10,
    border: "1px solid white",
  },
}));

function Home(props) {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(ALL_POSTS);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {loading ? (
        <Paper className={classes.paperC} variant="outlined">
          <LinearProgress color={"primary"} />
        </Paper>
      ) : null}
      {error ? <p>{error}</p> : null}
      {data ? (
        <Paper className={classes.paper} variant="outlined">
          {user ? (
            ""
          ) : (
            <p
              style={{
                textAlign: "center",
                color: "#888888",
                fontWeight: "bolder",
              }}
            >
              please login to start interacting with posts
            </p>
          )}
          {data.getPosts.map((post) => {
            return user ? (
              <PostItem post={post} key={post.id} username={user.username} />
            ) : (
              <PostItem post={post} key={post.id} />
            );
          })}
        </Paper>
      ) : null}

      <Paper className={classes.paperC} variant="outlined">
        <div className={classes.logoBox}>
          <img src={logo} className={classes.logo} />
        </div>
        {user ? <ProfileBox user={user} /> : <LoginRegister />}
      </Paper>
    </div>
  );
}
export default Home;

// function App() {

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :</p>;

//   return (
//     <div className="App">
//       {data.getPosts.map((post) => {
//         return (
//           <div key={post.id}>
//             <p>Username:{post.username}</p>
//             <p>Title:{post.header}</p>
//             <p>Body:{post.body}</p>
//           </div>
//         );
//       })}
//       {console.log(data)}
//     </div>
