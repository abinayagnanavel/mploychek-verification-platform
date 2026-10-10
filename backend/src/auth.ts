import { Router, Request, Response } from "express";

const router = Router();

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (
    email === "admin@mploychek.com" &&
    password === "admin123"
  ) {
    return res.json({
      success: true,
      role: "admin",
      name: "Admin User",
      email
    });
  }

  if (
    email === "user@mploychek.com" &&
    password === "user123"
  ) {
    return res.json({
      success: true,
      role: "user",
      name: "General User",
      email
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid email or password"
  });
});

export default router;