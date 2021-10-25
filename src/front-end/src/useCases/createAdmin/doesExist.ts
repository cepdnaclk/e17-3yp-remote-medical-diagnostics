import client from "../../httpClient";

/**
 * Shows whether an admin account has been already created
 * @returns boolean value
 */
export default async function doesAdminExist() {
  const response = await client.get<boolean>("/admin/exist");
  return response.data;
}
