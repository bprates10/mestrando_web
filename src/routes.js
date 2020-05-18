import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import Add from "./views/AddPlayer/index.jsx";
import Login from "./views/Login/index.jsx";
import Home from "./views/Home/index.jsx";
import AddPlayerAdmin from "./views/tela_cadastro_jogadores/ViewPlayers.jsx"

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <PrivateRoute path="/addplayer" component={Add} />
      <PrivateRoute path="/addplayeradmin" component={AddPlayerAdmin} />
      <PrivateRoute path="/home" component={Home} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;