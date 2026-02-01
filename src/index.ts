import express, { Request, Response } from 'express';
import path from 'path';
import 'dotenv/config';

import { connectDB } from './config/database';
import authRoutes from './routes/auth.route';
import { authenticate, authorize } from './middlewares/auth.middleware';

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB();

// Middleware para interpretar JSON
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rutas de autenticación
app.use('/auth', authRoutes);

// Ruta pública
app.get('/public', (req: Request, res: Response) => {
    res.json({
        message: 'Cualquiera puede entrar!',
    });
});

// Ruta protegida (requiere autenticación)
app.get('/protected', authenticate, (req, res) => {
    res.json({
        message: 'Acceso permitido',
        user: req.user,
    });
});

// Ruta de administrador (requiere autenticación y rol admin)
app.get('/admin', authenticate, authorize(['admin']), (req, res) => {
    res.json({
        message: 'Acceso de administrador permitido',
        user: req.user,
    });
});

app.get('/api/saludo', (req: Request, res: Response) => {
    res.json({ mensaje: 'Hola desde la API 🚀' });
});

// Iniciar el servidor HTTP
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT} 🚀`);
});