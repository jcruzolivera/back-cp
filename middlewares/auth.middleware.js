const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt.config");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ mensaje: "Token no proporcionado" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded; // Usar esto para obtener el id de usuario
    next();
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
};
