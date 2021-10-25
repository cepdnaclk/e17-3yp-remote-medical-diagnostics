import client from "../../httpClient";

interface adminRegisterDetails {
  name: string;
  password: string;
  email: string;
}

/**
 * Registers a new admin account
 */
export default async function registerAdmin(data: adminRegisterDetails) {
  const response = await client.post("/admin/signup", data);
  return response.data;
}
