import { ComponentType, FunctionComponent } from "react";
import { ConnectedComponent } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface PrivateRouteProps {
  Comp: ComponentType | ConnectedComponent<any, any>;
  path: string;
}

/**
 * Private route based on authentication
 * User will be redirected to login page if not authenticated
 */
const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  Comp,
  path,
  ...rest
}) => {
  const authContext = useAuth();
  return (
    <Route
      path={path}
      {...rest}
      render={({ location }) =>
        authContext.isAuth ? (
          <Comp />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
