const jwt = require("jsonwebtoken");
import { NextFunction, Request, Response, RequestHandler } from "express";

// type AuthenticatedRequestHandler = RequestHandler<{}, any, any, any, Record<string, any>>;

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateUser: RequestHandler = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // Get the token from the request headers, e.g., "Authorization: Bearer <token>"
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err: any, decodedToken: any) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decodedToken;

    next();
  });
};
export const authenticateAuthor: RequestHandler = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // Get the token from the request headers, e.g., "Authorization: Bearer <token>"
  const token = req.headers.authorization?.split(" ")[1];
  // const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err: any, decodedToken: any) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized", error: err, token: token });
    }

    const allowedRoles = ["author"];

    if (!allowedRoles.includes(decodedToken.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  });
};
export default {
  authenticateUser,
  authenticateAuthor,
};
