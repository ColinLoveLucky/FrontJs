import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Users from "./routes/Users.js";

import Products from "./routes/Products.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
      </Switch>
      <Route path="/users" component={Users} />
      <Route path="/products" component={Products} />
    </Router>
  );
}

export default RouterConfig;
