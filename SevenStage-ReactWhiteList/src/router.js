import React from 'react';
import { Route, Switch, HashRouter} from 'dva/router';
import RouteAll from './routeAll';
import enUS from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd';

function RouterConfig({history}) {
  return (
    <LocaleProvider locale={enUS}>
      <HashRouter>
        <Switch>
          <Route  path="/" component={RouteAll}></Route>
        </Switch>
      </HashRouter>
    </LocaleProvider>
  )
}
export default RouterConfig;
