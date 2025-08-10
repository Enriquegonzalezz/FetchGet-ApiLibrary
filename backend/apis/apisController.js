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
            const { category, search, page = 1, limit = 10 } = req.query;
            
            const apis = await ApisModel.getAll({
                category,
                search,
                page: parseInt(page),
                limit: parseInt(limit)
            });

            const totalCount = await ApisModel.countFiltered({ category, search });
            const totalPages = Math.ceil(totalCount / parseInt(limit));

            return res.status(200).json({
                apis,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages,
                    totalCount,
                    limit: parseInt(limit)
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: `Error al obtener las APIs: ${error.message}` });
        }
    }

    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const api = await ApisModel.getById(id);
            
            if (!api) {
                return res.status(404).json({ error: 'API no encontrada' });
            }

            return res.status(200).json(api);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: `Error al obtener la API: ${error.message}` });
        }
    }

    getByName = async (req, res) => {
        try {
            const { name } = req.params;
            const api = await ApisModel.getByName(name);
            
            if (!api) {
                return res.status(404).json({ error: 'API no encontrada' });
            }

            return res.status(200).json(api);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: `Error al obtener la API: ${error.message}` });
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

    delete = async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await ApisModel.deleteById(id);
            if (!deleted) {
                return res.status(404).json({ error: 'API no encontrada' });
            }
            return res.status(200).json({ message: 'API eliminada exitosamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: `Error al eliminar la API: ${error.message}` });
        }
    }
}

export { ApisController };