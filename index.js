import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createAdminsRouter } from './backend/admins/adminsRoutes.js';
import { createApisRouter } from './backend/apis/apisRoutes.js';
import { AdminsModel } from './backend/admins/adminsModel.js';
import ApisModel from './backend/apis/apisModel.js';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/images', express.static(path.join(__dirname, 'images')));

const vueRoutes = ['/login', '/admin/dashboard', '/apis', '/apis/:id', '/admin/createapis'];
vueRoutes.forEach(route => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
});

app.use("/admin-auth", createAdminsRouter());
app.use("/apis-model", createApisRouter());

const port = process.env.PORT || 3000;

// Función para inicializar la base de datos
const initDatabase = async () => {
  try {
    console.log('Inicializando base de datos...');
    await AdminsModel.createTable();
    await ApisModel.createTable();
    console.log('Base de datos inicializada correctamente');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
};

// Inicializar la base de datos y luego arrancar el servidor
initDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});