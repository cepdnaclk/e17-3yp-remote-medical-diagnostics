import yup,{ object, string } from "yup";

export const LogoutSchema = object({
    body: object({

        refreshToken: string()
            .required("Refresh token required")

    }),
});

