const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const productoRoutes = require('./src/Routes/Producto.Routes');
const UsuarioRoutes = require('./src/Routes/Usuario.Routes');
const path = require('path');

// Ruta al folder Client desde la raíz del proyecto
const clientPath = path.join(__dirname, './Client');

// Middleware para parsear JSON
app.use(express.json());

app.use(cors());

// Rutas
app.use('/api/productos', productoRoutes);
app.use('/api/usuarios', UsuarioRoutes);
// app.use('/api/Db', dbConn);

// Servir archivos estáticos (CSS, JS, imágenes, etc.)
app.use(express.static(clientPath));

// Ruta por defecto para que sirva el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });



// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});