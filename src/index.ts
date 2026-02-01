import 'dotenv/config';
import express, { Request, Response } from 'express';


import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Recrear __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import { connectDB } from './config/database'; //! CUANDO SE HACE DECLARACION DE QUE EL SERVIDOR SE VA A CONECTAR A MONGODB, con la Promise, EL SERVIDOR NO VA A ESTAR LISTO HASTA QUE LA CONEXION NO ESTE HECHA. POR ESO DEFINIMOS CONNECTDB Y LUEGO LO IMPORTAMOS.
import authRoutes from './routes/auth.route';
import { authenticate, authorize } from './middlewares/auth.middleware';

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a MongoDB
//connectDB();

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

//! CONECTAR A MONGODB Y LUEGO INICIAR EL SERVIDOR
connectDB().then (()=> {  //! CUANDO EFECTIVAMENTE SE CONECTE (y then, termine la accion de conectar)
    app.listen(PORT, () => {  //! CORREMOS EL SERVIDOR
    console.log(`Servidor corriendo en http://localhost:${PORT} 🚀`); //! ASI LEVANTAMOS LA APP CUANDO MONGODB YA ESTE CONECTADO
});
});
