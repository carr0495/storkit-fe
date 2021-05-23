import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// color app logo #24DB83
//secondary : #FF4E00
//third : #F5BB00
import Home from "./pages/Home";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { AuthProvider } from "./context/auth";
function App() {
  const theme = React.useMemo(() =>
    createMuiTheme({
      palette: {
        type: "dark",
      },
    })
  );
  return (
    <AuthProvider>
      <div className="App" style={{ backgroundColor: "#303030" }}>
        <ThemeProvider theme={theme}>
          <Router>
            <div>
              {/* <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav> */}

              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
              <Switch>
                {/* <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route> */}
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          </Router>
        </ThemeProvider>
      </div>
    </AuthProvider>
  );
}

export default App;
