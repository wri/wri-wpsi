import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { DataStoryMainPage } from "./MainPage";
import { DataStoryRegionNotFoundPage } from "./NotFoundPage";
import { DataStoryRegionPage } from "./RegionPage";
// import { scrollToTop } from "util/scrollToTop";
// const { pathname } = useLocation();
// React.useEffect(scrollToTop, [pathname]);

const Inner = () => {

  return (
    <Switch>
      <Route path="/" exact>
        <DataStoryMainPage />
      </Route>
      <Route path="/regions/:regionId" exact>
        <DataStoryRegionPage />
      </Route>
      <Route>
        <DataStoryRegionNotFoundPage />
      </Route>
    </Switch>
  );
};

const routeBasename = "/causal";
export const DataStoryRoot = () => {
  return (
    <BrowserRouter basename={routeBasename}>
      <Inner />
    </BrowserRouter>
  );
};
