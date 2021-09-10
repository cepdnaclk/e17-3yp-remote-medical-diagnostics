import client from "../httpClient";

export default class Token {
  private static refreshToken: string | null;
  /**
   * Stores a refresh token in the localStorage of the browser
   * @param token Token to be stored
   */
  static storeRefreshToken(token: string) {
    try {
      localStorage.setItem("refreshToken", token);
    } catch (error) {
      console.error(
        (<Error>error)?.message || "Error when storing the refreshToken"
      );
      throw error;
    }
  }
  /**
   * Get the refresh token from the local storage
   * @returns The refresh token if there is any otherwise null
   */
  static getRefreshTokenFromStorage() {
    this.refreshToken = localStorage.getItem("refreshToken");
    return this.refreshToken;
  }

  /**
   * Get an access token from the refresh-token. This method
   * will return null if the refresh token given is invalid
   * @returns an access-token or null
   */
  static async getAccessToken() {
    type data = {
      accessToken: string;
    };
    var response = await client.post<data>("/token", {
      refreshToken: this.refreshToken,
    });
    if (response.status === 403) {
      console.info("Refresh token is invalid");
      return null;
    }
    return response.data.accessToken;
  }
}
