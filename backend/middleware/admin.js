const adminMiddleware = (req, res, next) => {
  try {
    // Verificar que el usuario está autenticado y tiene información
    if (!req.user) {
      return res.status(401).json({
        message: "Usuario no autenticado",
      });
    }

    // Verificar que el rol es 2 (admin)
    if (req.user.role !== 2) {
      return res.status(403).json({
        message: "Acceso denegado. Se requieren permisos de administrador",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error al verificar permisos",
      error: error.message,
    });
  }
};

export default adminMiddleware;
