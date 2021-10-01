import { Request, Router } from "express";
import authenticateToken, {
  authResponse,
} from "../middleware/authenticateToken";
import { getUserDetailsFromDb } from "../service/getMeDetails";

const authRouter = Router();
authRouter.use(authenticateToken);

authRouter.get("/me", async (req: Request, res: authResponse) => {
  const user = res.locals.user;
  const info = await getUserDetailsFromDb(user.type, user.email);

  res.json({
    ...user,
    ...info,
  });
});

export default authRouter;
