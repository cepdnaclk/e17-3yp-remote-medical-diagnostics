import Token from "../../model/Token";

export default async function logOut() {
  await Token.invalidateRefreshTOken();
  Token.removeRefreshTOken();
}
