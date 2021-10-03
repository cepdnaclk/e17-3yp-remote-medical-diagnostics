import client from "../httpClient";

export interface User {
  email: string;
  type: string;
  name: string;
}

/**
 * Get the current user from the access token
 * @returns A `User` object
 */
export const getCurrentUser = async () => {
  try {
    const resp = await client.get<User>("/me");
    return resp.data;
  } catch (error) {
    return null;
  }
};
