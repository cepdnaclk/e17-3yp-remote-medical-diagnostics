import { object, string } from "yup";

export const LoginSchema = object({
    body: object({

        email: string()
            .email("Must be a valid email")
            .required("Email required")

        , password: string()
            .required("Password is required")
            .min(8, "password must be at least 8 characters")
            .matches(/^[a-z0-9A-Z_.-]*$/, "only latin characters are allowed"),


    }),
});