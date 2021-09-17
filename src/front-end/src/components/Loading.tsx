import { FunctionComponent, useEffect } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../globalStates/AuthContext";

interface props {}
/**
 * Shows a loading screen while checking for the authentication
 * @returns
 */
const Loading: FunctionComponent<props> = () => {
  const history = useHistory();
  const { isLoading, loadSession } = useAuth();

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  useEffect(() => {
    if (!isLoading) history.push("/home");
  }, [history, isLoading]);

  return <h1>Loading </h1>;
};

export default Loading;
