import mongoose from "mongoose";
import Config from "../config/default";
import bcrypt from "bcrypt";
//uses a symmetric-key block cipher called Blowfish for hashing passwords

export interface AdminDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

AdminSchema.methods.comparePassword = async function (enteredPassword: string) {
  const admin = this as AdminDocument;

  //entered password is plaintext; doctor.password is a hash
  return bcrypt.compare(enteredPassword, admin.password).catch((e) => false);
};

//Pre middleware functions are executed one after another, when each middleware calls next
AdminSchema.pre("save", async function (next: mongoose.HookNextFunction) {
  let admin = this as AdminDocument;

  //return to the next function if the password is not modified
  //(if !modified the function is already hashed)
  if (!admin.isModified("password")) return next();

  //a random string to make the hash unpredictable
  const salt = await bcrypt.genSalt(Config.saltWorkFactor);
  const hash = await bcrypt.hash(admin.password, salt);

  admin.password = hash;
});

const Admin = mongoose.model<AdminDocument>("Admin", AdminSchema);

export default Admin;
