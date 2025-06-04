import createConnection from '../connection.js';

class ApisModel {
    static async store({ api }) {
        const {
            name,
            description,
            category,
            endpoint,
            json,
            preview
        } = api;

        let connection;
        try {
            connection = await createConnection();
            const [result] = await connection.execute(
                "INSERT INTO apis (name, description, category, endpoint, json, preview) VALUES (?, ?, ?, ?, ?, ?)",
                [name, description, category, endpoint, JSON.stringify(json), preview]
            );
            return result.insertId; // Retorna el ID del nuevo registro
        } catch (error) {
            throw new Error(`Error al almacenar la API ${name}: ${error.message}`);
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    }

    static async createTable() {
        let connection;
        try {
            connection = await createConnection();
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS apis (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(500) NOT NULL UNIQUE,
                    description VARCHAR(500) NOT NULL,
                    category VARCHAR(500) NOT NULL,
                    endpoint TEXT NOT NULL,
                    json TEXT NOT NULL,
                    preview VARCHAR(500) NOT NULL
                );
            `;
            await connection.execute(createTableQuery);
            console.log("Tabla 'apis' creada o ya existe.");
        } catch (error) {
            console.error(`Error al crear la tabla 'apis': ${error.message}`);
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    }
}

export default ApisModel;