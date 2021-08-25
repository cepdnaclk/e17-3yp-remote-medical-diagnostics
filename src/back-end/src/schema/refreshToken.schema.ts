import yup,{ object, string } from "yup";

export const refreshTokenSchema = object({
    body: object({

        refreshToken: string()
            .required("Refresh token required")

    }),
});

