import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized: No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;

      // Role-based access control
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden: Access denied." });
      }

      next();
    } catch (err) {
      console.error("Token verification error:", err.message);
      res.status(401).json({ message: "Invalid or expired token." });
    }
  };
};

export default authMiddleware;
