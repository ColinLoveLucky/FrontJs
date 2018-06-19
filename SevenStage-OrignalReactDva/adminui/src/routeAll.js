import React from 'react';
import { Route, Switch, Redirect } from 'dva/router';
import Login from './routes/User/login';
import App from './routes/App';
export  default class RouteAll extends React.Component {
  render() {
    return (
      <Switch>
        <Route  path="/app" component={App}></Route>
        <Route  path="/login" component={Login}></Route>
        <Redirect from='*' to="/login" />
      </Switch>
    );
  }
}
