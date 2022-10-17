import React from "react";
import { Redirect, Route } from "react-router-dom";

function Protected({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("key");
  console.log("this", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/Login" />
      }
    />
  );
}

export default Protected;