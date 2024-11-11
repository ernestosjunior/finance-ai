"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const AppProgressBar = () => {
  return (
    <ProgressBar
      height="0.2rem"
      color="#55B02E"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};

export default AppProgressBar;
