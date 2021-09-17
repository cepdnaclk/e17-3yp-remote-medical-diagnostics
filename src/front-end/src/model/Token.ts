import client, { isAxiosError } from "../httpClient";

export default class Token {
  private static refreshToken: string | null;
  static accessToken: string | null;
  /**
   * Stores a refresh token in the localStorage of the browser
   * @param token Token to be stored
   */
  static storeRefreshToken(token: string) {
    try {
      localStorage.setItem("refreshToken", token);
    } catch (e) {
      if (isAxiosError(e)) e.message = e.response?.data;
      throw e;
    }
  }

  /**
   * Remove the refresh token from the local storage
   */
  static removeRefreshTOken() {
    localStorage.removeItem("refreshToken");
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
   * will throw error if the refresh token given is invalid
   * @returns an access-token or null
   */
  static async getAccessToken() {
    type data = {
      accessToken: string;
    };
    try {
      var response = await client.post<data>("/token", {
        refreshToken: this.refreshToken,
      });
      this.accessToken = response.data.accessToken;
      return response.data.accessToken;
    } catch (e) {
      if (isAxiosError(e)) e.message = e.response?.data;
      throw e;
    }
  }

  /**
   * Calls /login endpoint to obtain token pair
   * @param email email of the user
   * @param password password of the user
   * @param userType Either 'patient' or 'doctor'
   * @returns refresh token and access token
   */
  static async getNewTokenPair(
    email: string,
    password: string,
    userType: string
  ) {
    type data = {
      accessToken: string;
      refreshToken: string;
    };
    try {
      var response = await client.post<data>(`/login/${userType}`, {
        email,
        password,
      });
      this.accessToken = response.data.accessToken;
      return response.data;
    } catch (e) {
      if (isAxiosError(e)) e.message = e.response?.data;
      // console.log(e);
      throw e;
    }
  }

  /**
   * TO invalidate a refresh token
   */
  static async invalidateRefreshTOken() {
    try {
      await client.post("/logout", {
        refreshToken: this.refreshToken,
      });
    } catch (error) {
      throw error;
    }
  }
}
