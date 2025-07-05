import React from "react";

import { Navbar, PageNotFound } from "components/commons";
import Favourites from "components/Favourites";
import Home from "components/Home";
import { Switch, Route, Redirect } from "react-router-dom";
import { routes } from "routes";

const App = () => (
  <div className="scroll-hidden flex h-screen w-screen flex-col overflow-auto">
    <div className="z-50 w-full text-white">
      <Navbar />
    </div>
    <div className="h-full w-full">
      <Switch>
        <Route exact component={Home} path={routes.home.index} />
        <Route exact component={Favourites} path={routes.favourites.index} />
        <Redirect exact from={routes.root} to={routes.home.index} />
        <Route exact component={PageNotFound} path={routes.pageNotFound} />
      </Switch>
    </div>
  </div>
);

export default App;
