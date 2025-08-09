const request = require('supertest');
const express = require('express');
const productoRoutes = require('../src/Routes/Producto.Routes');
const productoService = require('../src/Services/Producto.Service');

// Configurar la app para pruebas
const app = express();
app.use(express.json());
app.use('/api/productos', productoRoutes);

// Mockear el productoService
jest.mock('../src/Services/Producto.Service');

describe('API de Productos (JSON DB)', () => {
    // Limpiar mocks antes de cada prueba
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('POST /api/productos/create - debería crear un nuevo producto', async () => {
        const nuevoProducto = {
            Namee: 'Laptop',
            Price: 1500,
            Description: 'Laptop de alta gama'
        };

        const idGenerado = 'abc123xyz0';

        productoService.randomString.mockReturnValue(idGenerado);
        productoService.crearProducto.mockResolvedValue({
            Id: idGenerado,
            ...nuevoProducto
        });

        const response = await request(app)
            .post('/api/productos/create')
            .send(nuevoProducto)
            .expect('Content-Type', /json/)
            .expect(201);

        expect(response.body).toMatchObject({
            mensaje: 'Producto creado',
            producto: {
                Id: idGenerado,
                ...nuevoProducto
            }
        });
    });

    test('GET /api/productos - debería devolver todos los productos', async () => {
        const productosMock = [
            { Id: 'xyz789abcd', Namee: 'Monitor', Price: 300, Description: 'Monitor LED' }
        ];

        productoService.obtenerProductos.mockResolvedValue(productosMock);

        const response = await request(app)
            .get('/api/productos')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toEqual(productosMock);
    });

    test('GET /api/productos/:id - debería devolver un producto por ID', async () => {
        const productoMock = {
            Id: 'def456jklm',
            Namee: 'Teclado',
            Price: 50,
            Description: 'Teclado mecánico'
        };

        productoService.obtenerProductoPorId.mockResolvedValue(productoMock);

        const response = await request(app)
            .get('/api/productos/def456jklm')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toEqual(productoMock);
    });

    test('PUT /api/productos/update/:id - debería actualizar un producto existente', async () => {
        const datosActualizados = {
            Namee: 'Mouse Pro',
            Price: 30,
            Description: 'Mouse óptico'
        };

        productoService.actualizarProducto.mockResolvedValue({
            mensaje: 'Producto actualizado exitosamente',
            filasAfectadas: 1
        });

        const response = await request(app)
            .put('/api/productos/update/ghi789pqrs')
            .send(datosActualizados)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toMatchObject({
            mensaje: 'Producto actualizado exitosamente',
            filasAfectadas: 1
        });
    });

    test('DELETE /api/productos/delete/:id - debería eliminar un producto', async () => {
        productoService.eliminarProducto.mockResolvedValue({
            mensaje: 'Producto eliminado exitosamente',
            filasAfectadas: 1
        });

        const response = await request(app)
            .delete('/api/productos/delete/jkl012vwxy')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toMatchObject({
            mensaje: 'Producto eliminado exitosamente',
            filasAfectadas: 1
        });
    });

    test('POST /api/productos/create - debería fallar si faltan datos', async () => {
        const productoIncompleto = {
            Namee: 'Tablet',
            Price: 500 // Falta Description
        };

        const response = await request(app)
            .post('/api/productos/create')
            .send(productoIncompleto)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body.mensaje).toBe('Faltan datos requeridos');
    });
});
