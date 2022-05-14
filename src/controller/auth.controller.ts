import { Request, Response } from "express";
import { get } from "lodash";
import { CreateSessionInput } from "../schema/auth.schema";
import {
  findSessionById,
  signAccessToken,
  signRefreshToken,
} from "../service/auth.service";
import { findUserByEmail, findUserById } from "../service/user.service";
import { verifyJwt } from "../utils/jwt";
import log from "../utils/logger";

export async function createSessionHandler(
  req: Request<{}, {}, CreateSessionInput>,
  res: Response
) {
  const message = "Invalid email or password";
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.send(message);
  }

  // if (!user.verified) {
  //   return res.send("Please verify your email");
  // }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return res.send(message);
  }

  // sign a access and token
  const accessToken = signAccessToken(user);
  const refreshToken = await signRefreshToken({ userId: user._id });

  // send the tokens to the client
  return res
    .cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({ accessToken, refreshToken });
}

export async function refreshAccessTokenHandler(req: Request, res: Response) {
  const refreshToken = get(req, "headers.x-refresh");
  log.info(`refreshToken: ${refreshToken}`);

  const decoded = verifyJwt<{ session: string }>(
    refreshToken,
    "refreshTokenPublicKey"
  );

  if (!decoded) {
    return res.status(401).send("Could not refresh access token");
  }

  const session = await findSessionById(decoded.session);

  if (!session || !session.valid) {
    return res.status(401).send("Could not refresh access token");
  }

  const user = await findUserById(String(session.user));

  if (!user) {
    return res.status(401).send("Could not refresh access token");
  }

  const accessToken = signAccessToken(user);

  return res.send({ accessToken });
}
