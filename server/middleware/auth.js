const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  console.log("Token:", token);

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  next();
};

export default authMiddleware;