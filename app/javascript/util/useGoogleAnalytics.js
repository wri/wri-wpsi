import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const trackPage = (location) => {
  const url = location.pathname + location.search;
  const dataLayer = (window.dataLayer = window.dataLayer || []);
  dataLayer.push({
    event: "pageview",
    page_location: url,
  });
};

export const useGoogleAnalytics = () => {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen((location) => {
      trackPage(location);
    });
    return () => unlisten();
  });
};
