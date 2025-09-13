import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true, // Prevents client-side access
    secure: process.env.NODE_ENV === "production", // Secure only in production (HTTPS)
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Needed for cross-site cookies
  });

  return token;
};
