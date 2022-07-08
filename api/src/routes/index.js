const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const doggosRoute = require("./dogs");
const temperamentsRoute = require("./temperaments");
const addNewDogRoute = require("./addNewDog");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", doggosRoute);
router.use("/temperaments", temperamentsRoute);
router.use("/add_new_doggo", addNewDogRoute);

module.exports = router;
