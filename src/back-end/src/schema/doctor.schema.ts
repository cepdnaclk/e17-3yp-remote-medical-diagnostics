import { object, string, ref, number } from "yup";

export const createDoctorSchema = object({
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
    isAvailable: string().notRequired(), //
    specialization: string().required("Specialization is required"),
    license: string().required("license details are needed"),
    age: number().min(3, "invalid age").max(100, "too old").required(),
    gender: string()
      .matches(/M|F/, "Should be either 'M' or 'F'")
      .required("gender required"),
    mobileNo: string()
      .matches(/^[0-9]+/, "must be a number")
      .min(8, "invalid mobile number")
      .max(12, "invalid mobile number")
      .required(),
  }),
});
