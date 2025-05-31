import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createConnection from '../connection.js';

class AdminsModel {
    static async register({ admin }) {
        const {
            password,
            email
        } = admin;
        const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

        let connection;
        try {
            connection = await createConnection();
            const [result] = await connection.execute(
                "INSERT INTO admins (password, email) VALUES (?, ?)",
                [hashedPassword, email]
            );
            // No se retorna la contraseña
            return {
                email: email
            };
        } catch (error) {
            throw new Error(`Error al crear el administrador ${email}: ${error.message}`);
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    }

    static async login({ admin }) {
        const {
            email,
            password
        } = admin;
        let connection;
        try {
            connection = await createConnection();
            const [rows] = await connection.execute('SELECT * FROM admins WHERE email = ?', [email]);
            if (rows.length === 0) {
                throw new Error(`El administrador ${email} no existe.`);
            }
            const user = rows[0];
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                throw new Error("Contraseña inválida.");
            }

            const token = jwt.sign(
                { username: user.username, email: user.email },
                SECRET_JWT_KEY,
                {
                    expiresIn: "1h"
                }
            );
            return {
                email: user.email,
                token: token
            };
        } catch (error) {
            console.log(error);
            throw new Error(`Error al buscar el administrador ${email}: ${error.message}`);
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    }

    static async verifyToken({ token }) {
        return jwt.verify(token, SECRET_JWT_KEY, (err) => {
            if (err) {
                return { valid: false };
            }
            return { valid: true };
        });
    }
}

export { AdminsModel };