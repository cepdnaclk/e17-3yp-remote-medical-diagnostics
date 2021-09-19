import react, { FunctionComponent, useContext, useState } from "react";
import { freshLogin, loginDetails } from "../useCases/logIn/freshLogin";
import { LoggedInState, tryToLogin } from "../useCases/logIn/oldLogin";

const initVal = {
  isAuth: false,
  isLoading: true,
  login: freshLogin,
  markAuthSuccess: () => {},
  markLoadingFinish: () => {},
  loadSession: () => {},
};
type authContextType = typeof initVal;

export const AuthContext = react.createContext<authContextType>(initVal);
interface authProviderProps {}

const AuthProvider: FunctionComponent<authProviderProps> = ({
  children,
  ...rest
}) => {
  const [isAuth, setAsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const markAuthSuccess = () => {
    setAsAuth(true);
  };
  const markLoadingFinish = () => {
    setLoading(false);
  };
  const login = async (data: loginDetails) => {
    await freshLogin(data);
    setAsAuth(true);
    setLoading(false);
  };

  const loadSession = async () => {
    const loginState = await tryToLogin();
    if (loginState === LoggedInState.AlreadyLoggedIn) markAuthSuccess();
    markLoadingFinish();
  };
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        isLoading,
        login,
        markAuthSuccess,
        markLoadingFinish,
        loadSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
