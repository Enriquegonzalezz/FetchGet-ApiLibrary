import mysql from 'mysql2/promise';
import 'dotenv/config';

export default async function createConnection() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || '127.0.0.1',
            user: process.env.DB_USERNAME || 'root',
            port: process.env.DB_PORT || '3306',
            password: process.env.DB_PASSWORD || '5453kike.',
            database: process.env.DB_DATABASE || 'fetchget',
        });
        console.log('Connected to the database.');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
    return connection;
}