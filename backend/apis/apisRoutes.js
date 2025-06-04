const { Router } = require('express');
const { ApisController } = require('./apisController.js');

export function createApisRouter() {
    const apisRouter = Router();
    const apisController = new ApisController();

    // Define las rutas para las APIs
    apisRouter.post('/register', apisController.register);
    // Puedes agregar más rutas aquí según sea necesario

    return apisRouter;
}