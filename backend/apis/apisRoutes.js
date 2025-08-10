import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { ApisController } from './apisController.js';

export function createApisRouter() {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.resolve('images'));
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

    // Filtro para aceptar solo imágenes
    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('El archivo debe ser una imagen'), false);
        }
    }

    const upload = multer({
        storage,
        fileFilter,
        limits: { fileSize: 2 * 1024 * 1024 } // 2MB
    });

    const apisRouter = Router();
    const apisController = new ApisController();

    apisRouter.post('/register', upload.single('preview'), apisController.register);
    apisRouter.get('/getfive', apisController.getFive);
    apisRouter.get('/getcount', apisController.getCount);
    apisRouter.get('/getall', apisController.getAll);
    apisRouter.get('/getbyid/:id', apisController.getById);
    apisRouter.get('/getbyname/:name', apisController.getByName);
    apisRouter.delete('/delete/:id', apisController.delete);

    return apisRouter;
}