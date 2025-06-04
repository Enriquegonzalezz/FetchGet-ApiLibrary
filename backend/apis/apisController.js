import ApisModel from './apisModel.js';
import { validateApi } from './apisValidate.js';

class ApisController {
    register = async (req, res) => {
        const result = validateApi(req.body);
        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) });
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