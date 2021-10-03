import { authResponse } from "../middleware/authenticateToken";
import { Request } from "express";
import { getUserDetailsFromDb } from "../service/getMeDetails";

/**
 * Handles requests to the /me endpoint
 */
export async function handleMe(req: Request, res: authResponse) {
  const user = res.locals.user;
  const info = await getUserDetailsFromDb(user.type, user.email);

  return res.json({
    ...user,
    ...info,
  });
}
