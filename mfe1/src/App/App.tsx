import React from "react";
import { AppWrapper } from "./App.style";

const RemoteButton = React.lazy(() => import("mfe2/Button"));

const App = () => {
  return (
    <AppWrapper>
      <span>MFE1 shell</span>
      <React.Suspense fallback="Loading button">
        <RemoteButton />
      </React.Suspense>
    </AppWrapper>
  );
};
export default App;
