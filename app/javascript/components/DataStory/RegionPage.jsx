import React from "react";
import { DataStoryChapter } from "./Chapter";
import { DataStoryDocumentOutline } from "./DocumentOutline";

export const DataStoryRegionPage = () => {
  return (
    <DataStoryDocumentOutline title="Region">
      <DataStoryChapter title="Region here" anchor="intro">
        hello region
      </DataStoryChapter>
    </DataStoryDocumentOutline>
  );
};
