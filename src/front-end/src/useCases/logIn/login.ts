import { setAccessToken, setName } from "../../globalStates/LoggedUser";
import { getCurrentUser } from "../../model/thisUser";
import Token from "../../model/Token";
import Store from "../../Store";
export enum LoggedInState {
  NeedToLoginAgain,
  AlreadyLoggedIn,
}

/**
 * This function is used to obtain the current logged in session state
 * if there is any.
 * 1. Check local storage for the refresh token
 * 2. Get access token
 * 3. Set user information in global state
 * @returns The current state
 */
export async function tryToLogin(): Promise<LoggedInState> {
  const token = Token.getRefreshTokenFromStorage();
  if (!token) return LoggedInState.NeedToLoginAgain;

  const accessTOken = await Token.getAccessToken();
  if (!accessTOken) return LoggedInState.NeedToLoginAgain;

  const me = await getCurrentUser();
  Store.dispatch(setAccessToken(accessTOken));
  // todo: use name instead of email
  Store.dispatch(setName(me?.email || "No Name"));
  return LoggedInState.AlreadyLoggedIn;
}
