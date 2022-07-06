const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const doggosRoute = require("./dogs");
const temperamentsRoute = require("./temperaments");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", doggosRoute);
router.use("/temperaments", temperamentsRoute);

module.exports = router;