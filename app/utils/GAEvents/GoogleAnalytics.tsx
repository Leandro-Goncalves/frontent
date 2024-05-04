"use client";

import { useEffect } from "react";
import { initializeGA } from "./google-analytics";

const GoogleAnalytics: React.FC = () => {
  useEffect(() => {
    if (!(window as any).GA_INITIALIZED) {
      initializeGA();
      (window as any).GA_INITIALIZED = true;
    }
  }, []);

  return <></>;
};

export default GoogleAnalytics;
