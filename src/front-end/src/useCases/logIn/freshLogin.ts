import { setAccessToken, setName, seType } from "../../store/globalStates/LoggedUser";
import { getCurrentUser } from "../../model/thisUser";
import Token from "../../model/Token";
import Store from "../../store/Store";

export interface loginDetails {
  email: string;
  password: string;
  userType: string;
}

/**
 * Does a fresh login, Will set access and refresh tokens
 * @param data email and password
 */
export const freshLogin = async (data: loginDetails) => {
  console.log("fresh login");

  const { email, password, userType } = data;
  const tokens = await Token.getNewTokenPair(email, password, userType);
  Token.storeRefreshToken(tokens.refreshToken);
  const me = await getCurrentUser();
  Store.dispatch(setAccessToken(tokens.accessToken));

  // todo: use name instead of email
  Store.dispatch(setName(me?.email || "No Name"));
  Store.dispatch(seType(me?.type || "patient"));
};
