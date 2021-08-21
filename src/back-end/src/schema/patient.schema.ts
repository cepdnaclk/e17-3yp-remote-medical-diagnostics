import { stringify } from "querystring";
import { object, string, ref } from "yup";// for validating objects

export const createPatientSchema = object({
    body: object({
        name: string().required("Name is required"),
        password: string()
            .required("Password is required")
            .min(8, "password must be at least 8 characters")
            .matches(/^[a-z0-9A-Z_.-]*$/, "only latin characters are allowed"),
        passwordConfirmation: string().oneOf([ref("password"), null], "passwords must match"),
        email: string()
            .email("Must be a valid email")
            .required("Email required"),

        age: string()
            .matches(/^[0-9]/, "must be a number")
            .min(3, "invalid age").required(),
        gender: string()
            .matches(/M|F/, "Sould be either 'M' or 'F'")
            .required("gender required"),
        mobileNo: string()
            .matches(/^[0-9]+/, "must be a number")
            .min(10, "invalid mobile number")
            .max(10, "invalid mobile number")
            .required(),
        // TODO : valide not required fields if enterred
        homeAddress: string().notRequired(),
        weight: string().notRequired(),
        height: string().notRequired(),
        allergies: string().notRequired(),
        diseases: string().notRequired(),
        treatmentHistory: string().notRequired(),

    }),
});

export const createPatientSessionSchema = object({
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

