import { object, string, ref } from "yup";

export const createAdminSchema = object({
  body: object({
    name: string().required("Name is required"),
    password: string()
      .required("Password is required")
      .min(8, "password must be at least 8 characters")
      .matches(/^[a-z0-9A-Z_.-]*$/, "only latin characters are allowed"),
    passwordConfirmation: string().oneOf(
      [ref("password"), null],
      "passwords must match"
    ),
    email: string().email("Must be a valid email").required("Email required"),
  }),
});
