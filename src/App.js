import React from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { db } from "./components/firebase";
import Welcome from "./components/Welcome";
import Game from "./components/Game";
class App extends React.Component {
  createOnlineGame = () => {
    // Create new game & get ID
    const gameRef = db.ref("games/").push();
    const gameId = gameRef.key;
    this.props.history.push("/online/" + gameId);
  };

  joinOnlineGame = (gameId) => {
    this.props.history.push("/online/" + gameId);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <Link to="/">Caro</Link>
          </p>
        </header>
        <Switch>
          <Route path="/local" component={Game} />
          <Route path="/online/:gameId" component={Game} />
          <Route
            exact
            path="/"
            render={(props) => (
              <Welcome
                {...props}
                createOnlineGame={this.createOnlineGame}
                joinOnlineGame={this.joinOnlineGame}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
