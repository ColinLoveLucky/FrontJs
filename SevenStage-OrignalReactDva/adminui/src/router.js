import React from 'react';
import { Route, Switch, HashRouter} from 'dva/router';
import RouteAll from './routeAll'
function RouterConfig({history}) {
  return (
    <HashRouter>
      <Switch>
        <Route  path="/" component={RouteAll}></Route>
      </Switch>
    </HashRouter>
  )
}
export default RouterConfig;
