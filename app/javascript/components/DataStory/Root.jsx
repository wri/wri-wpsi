import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useGoogleAnalytics } from "util/useGoogleAnalytics";
import { DataStoryMainPage } from "./MainPage";
import { DataStoryRegionNotFoundPage } from "./NotFoundPage";
import { DataStoryRegionPage } from "./RegionPage";

const Inner = () => {
  useGoogleAnalytics();
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
