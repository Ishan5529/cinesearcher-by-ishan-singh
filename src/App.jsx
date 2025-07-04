import React from "react";

import { PageNotFound } from "components/commons";
import Home from "components/Home";
import { Switch, Route, Redirect } from "react-router-dom";
import { routes } from "routes";

const App = () => (
  <div className="h-screen w-screen overflow-y-hidden">
    <Switch>
      <Route exact component={Home} path={routes.home.index} />
      <Redirect exact from={routes.root} to={routes.home.index} />
      <Route exact component={PageNotFound} path={routes.pageNotFound} />
    </Switch>
  </div>
);

export default App;
