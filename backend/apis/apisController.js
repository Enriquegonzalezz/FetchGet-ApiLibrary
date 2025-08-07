import ApisModel from './apisModel.js';
import { validateApi } from './apisValidate.js';

class ApisController {
    getFive = async (req, res) => {
        try {
            const apis = await ApisModel.getFive();
            return res.status(200).json(apis);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: `Error al obtener las APIs: ${error.message}` });
        }
    }

    getCount = async (req, res) => {
        try {
            const count = await ApisModel.count();
            return res.status(200).json({ count });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: `Error al obtener el conteo de APIs: ${error.message}` });
        }
    }

    getAll = async (req, res) => {
        try {
            const apis = await ApisModel.getAll();
            return res.status(200).json(apis);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: `Error al obtener las APIs: ${error.message}` });
        }
    }

    register = async (req, res) => {
        if (req.fileValidationError) {
            return res.status(400).json({ error: req.fileValidationError });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'El archivo preview es obligatorio y debe ser una imagen de máximo 2MB.' });
        }
        // Si usas multer, el archivo estará en req.file
        const previewFileName = req.file ? req.file.filename : '';
        // Los otros campos estarán en req.body
        const apiInput = {
            ...req.body,
            preview: previewFileName,
            json: req.body.json // Si necesitas parsear, hazlo aquí
        };

        const result = validateApi(apiInput);
        if (!result.success) {
            return res.status(400).json({ error: result.error.errors });
        }

        const api = result.data;

        try {
            const result = await ApisModel.store({ api });
            return res.status(201).json({ message: `API ${result} registrada exitosamente` });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: `Error al registrar la API: ${error.message}` });
        }
    }
}

export { ApisController };