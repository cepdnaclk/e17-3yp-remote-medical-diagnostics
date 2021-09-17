import { FunctionComponent, useEffect } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../globalStates/AuthContext";
import "./Loading.css";

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

  return (
    <main className="container">
      <div className="d-flex flex-row  justify-content-center align-items-center loading-container">
        <div className="d-flex flex-column ">
          <div className="outline-square"></div>
        </div>
      </div>
    </main>
  );
};

export default Loading;
