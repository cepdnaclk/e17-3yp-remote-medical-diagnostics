import {
  setAccessToken,
  setName,
  seType,
} from "../../store/globalStates/LoggedUser";
import { getCurrentUser } from "../../model/thisUser";
import Token from "../../model/Token";
import Store from "../../store/Store";
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
  let accessToken: string;
  try {
    accessToken = await Token.getAccessToken();
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return LoggedInState.NeedToLoginAgain;
  }

  const me = await getCurrentUser();
  Store.dispatch(setAccessToken(accessToken));
  // todo: use name instead of email
  Store.dispatch(setName(me?.email || "No Name"));
  Store.dispatch(seType(me?.type || "patient"));
  return LoggedInState.AlreadyLoggedIn;
}
