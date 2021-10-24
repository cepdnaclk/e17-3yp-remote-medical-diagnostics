import { DocumentDefinition, FilterQuery } from "mongoose";
import Admin, { AdminDocument } from "../model/admin.model";
import { omit } from "lodash";
import log from "../logger";

export async function createAdmin(input: DocumentDefinition<AdminDocument>) {
  try {
    return await Admin.create(input);
  } catch (error) {
    throw error;
  }
}
export async function doesAdminExist() {
  return !!(await Admin.findOne().lean().exec());
}

/** get the user from email and password
    @param email email of the user
    @param password password to verify
    @returns patient
 */
export async function validatePassword({
  email,
  password,
}: {
  email: AdminDocument["email"];
  password: string;
}) {
  const admin = await Admin.findOne({ email }).exec();

  if (admin == null) {
    return null;
  }

  const isValid = await admin.comparePassword(password);

  if (!isValid) {
    return null;
  }
  return omit(admin.toJSON(), "password");
}
