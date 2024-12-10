export const authMiddleware = (roles = []) => {
    return (req, res, next) => {
      const token = req.headers.authorization?.split(" ")[1];
      
      if (!token) {
        return res.status(401).json({ message: "Unauthorized." });
      }
  
      try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
  
        if (roles.length && !roles.includes(decoded.role)) {
          return res.status(403).json({ message: "Forbidden: Access denied." });
        }        
        
        next();
      } catch (err) {
        res.status(401).json({ message: "Invalid token." });
      }
    };
  };
  