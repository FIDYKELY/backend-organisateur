import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // Récupérer le header d'autorisation
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ message: "Accès refusé. Aucun token fourni." });
    }

    // Format attendu: "Bearer token"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Accès refusé. Token invalide." });
    }

    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ajouter l'userId dans req.user pour l'utiliser dans les controllers
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "Token invalide ou expiré." });
  }
};
