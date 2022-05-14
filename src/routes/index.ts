import express from "express";
import user from "./user.routes";
import auth from "./auth.routes";
import category from "./category.routes";

const router = express.Router();

router.get("/healthcheck", (_, res) => res.sendStatus(200));

router.use("/api/users", user);
router.use("/api", auth);
router.use("/api", category);

export default router;
