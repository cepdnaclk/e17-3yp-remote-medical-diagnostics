import client from "../../httpClient";

interface signupData {
  name: string;
  email: string;
  age: number;
  gender: string;
  password: string;
  passwordConfirmation: string;
}

/**
 * Registers a new patient to the system
 * @param data of type `signupData`
 * @returns a 200 axios response
 */
export const signUp = async (data: signupData) => {
  try {
    return await client.post("/newPatient", data);
  } catch (error) {
    throw error;
  }
};
