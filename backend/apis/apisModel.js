import createConnection from '../connection.js';

class ApisModel {
    static async getFive() {
        let connection;
        try {
            connection = await createConnection();
            const [rows] = await connection.execute("SELECT * FROM apis LIMIT 5");
            return rows; // Retorna las primeras 5 APIs
        } catch (error) {
            throw new Error(`Error al obtener las APIs: ${error.message}`);
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    }

    static async count() {
        let connection;
        try {
            connection = await createConnection();
            const [rows] = await connection.execute("SELECT COUNT(*) AS count FROM apis");
            return rows[0].count; // Retorna el conteo de APIs
        } catch (error) {
            throw new Error(`Error al contar las APIs: ${error.message}`);
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    }

    static async getAll({ category = null, search = null, page = 1, limit = 10 } = {}) {
        let connection;
        try {
            connection = await createConnection();
            
            let query = "SELECT * FROM apis";
            let queryParams = [];
            let conditions = [];

            // Agregar filtro por categoría
            if (category && category !== 'All Categories') {
                conditions.push("category = ?");
                queryParams.push(category);
            }

            // Agregar filtro por búsqueda
            if (search && search.trim() !== '') {
                conditions.push("(name LIKE ? OR description LIKE ?)");
                const searchTerm = `%${search.trim()}%`;
                queryParams.push(searchTerm, searchTerm);
            }

            // Agregar condiciones WHERE si existen
            if (conditions.length > 0) {
                query += " WHERE " + conditions.join(" AND ");
            }

            // Agregar paginación
            const offset = (page - 1) * limit;
            query += ` ORDER BY id DESC LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`;



            const [rows] = await connection.execute(query, queryParams);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener las APIs: ${error.message}`);
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    }

    static async countFiltered({ category = null, search = null } = {}) {
        let connection;
        try {
            connection = await createConnection();
            
            let query = "SELECT COUNT(*) AS count FROM apis";
            let queryParams = [];
            let conditions = [];

            // Agregar filtro por categoría
            if (category && category !== 'All Categories') {
                conditions.push("category = ?");
                queryParams.push(category);
            }

            // Agregar filtro por búsqueda
            if (search && search.trim() !== '') {
                conditions.push("(name LIKE ? OR description LIKE ?)");
                const searchTerm = `%${search.trim()}%`;
                queryParams.push(searchTerm, searchTerm);
            }

            // Agregar condiciones WHERE si existen
            if (conditions.length > 0) {
                query += " WHERE " + conditions.join(" AND ");
            }

            const [rows] = await connection.execute(query, queryParams);
            return rows[0].count;
        } catch (error) {
            throw new Error(`Error al contar las APIs filtradas: ${error.message}`);
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    }

    static async getById(id) {
        let connection;
        try {
            connection = await createConnection();
            const [rows] = await connection.execute("SELECT * FROM apis WHERE id = ?", [id]);
            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error al obtener la API con ID ${id}: ${error.message}`);
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    }

    static async getByName(name) {
        let connection;
        try {
            connection = await createConnection();
            const [rows] = await connection.execute("SELECT * FROM apis WHERE name = ?", [name]);
            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error al obtener la API con nombre ${name}: ${error.message}`);
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    }

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

    static async deleteById(id) {
        let connection;
        try {
            connection = await createConnection();
            const [result] = await connection.execute("DELETE FROM apis WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al eliminar la API con ID ${id}: ${error.message}`);
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    }
}

export default ApisModel;