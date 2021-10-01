import client from "../../httpClient";

interface signupData {
  name: string;
  email: string;
  age: number;
  gender: string;
  password: string;
  passwordConfirmation: string;
}

export const signUp = async (data: signupData) => {
  try {
    return await client.post("/newPatient", data);
  } catch (error) {
    throw error;
  }
};
