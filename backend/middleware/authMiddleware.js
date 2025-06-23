import { verify } from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Token missing" });

  try {
    const decoded = verify(token, "SECRET_KEY");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default verifyToken;
