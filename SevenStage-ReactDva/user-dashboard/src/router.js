import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Products from "./routes/Products.js";

import Login from "./routes/Login.js";

import Register from "./routes/Register.js";

import Main from "./routes/Main.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/products" component={Products} />
        <Route path="/login" component={Login} />
        <Route path="/Register" component={Register} />
        <Route path="/main" component={Main} />
      </Switch>
    </Router>
  );
}
export default RouterConfig;
