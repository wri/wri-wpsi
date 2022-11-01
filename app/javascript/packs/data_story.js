// This logic renders a live-updating preview of a layer's widget on the layer
// form partial.

import React from "react";
import ReactDOM from "react-dom";
import { DataStoryRoot } from "components/DataStory/Root";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("j-datastory-root");
  ReactDOM.render(<DataStoryRoot />, root);
});
