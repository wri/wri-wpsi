import React from "react";
import { DataStoryMainPage } from "./MainPage";
import { DataStoryRegionPage } from "./RegionPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const routeBasename = "/causal";
export const DataStoryRoot = () => {
  return (
    <BrowserRouter basename={routeBasename}>
      <Switch>
        <Route path="/" exact>
          <DataStoryMainPage />
        </Route>
        <Route path="/regions/:regionId" exact>
          <DataStoryRegionPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
