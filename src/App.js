import AppRouter from "bits/AppRouter";
import AuthWrapper from "bits/AuthWrapper";
import React from "react";

function App() {
  return (
    <AuthWrapper>
      <AppRouter></AppRouter>
    </AuthWrapper>
  );
}

export default App;
