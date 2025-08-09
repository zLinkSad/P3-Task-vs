// Servicio para manejar el catálogo de productos
const { esProductoValido } = require('../Interfaces/Producto.Interface'); // importamos la interface
const fs = require('fs');
const path = require('path');


const rutaDb = path.join(__dirname, '../Migrations/DbFile.json');

function leerDb(){
    const content = fs.readFileSync(rutaDb, 'utf-8');
    return JSON.parse(content);
}

function escribirDb(data){
    fs.writeFileSync(rutaDb, JSON.stringify(data, null, 2));
}

class ProductoService{
    randomString(length){
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
        if (!length) {
            length = Math.floor(Math.random() * chars.length);
        }
        var str = '';
        for (var i = 0; i < length; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    async crearProducto(Id, Name, Price, Description){
        const data = leerDb();

        const nuevoProducto = {Id, Name, Price, Description};
        
        if(!esProductoValido(nuevoProducto)){
            throw new Error("Datos del producto invalido");
        }

        //validamos unnicidad

        if(data.Products.some(p => p.Id === Id)){
            throw new Error("Ya existe un producto con este Id");
        }

        data.Products.push(nuevoProducto);
        escribirDb(data);

        return nuevoProducto;
    }

    async obtenerProductos(){
        try {
            const data = leerDb();
            return data.Products;
        } catch (error) {
            throw new Error('Error al obtener los productos del archivo JSON: ' + error.message);
        }
    }

    async obtenerProductoPorId(Id){
        const data = leerDb();
        const producto = data.Products.find(p => p.Id === Id);
        if(!producto){
            throw new Error ("Producto no encontrado")
        }

        return producto;
    }

    async actualizarProducto(Id, datosProducto) {
        const data = leerDb();
        const index = data.Products.findIndex(p => p.Id === Id);
        if (index === -1) {
            throw new Error('Producto no encontrado');
        }

        const actualizado = { ...data.Products[index], ...datosProducto };
        if (!esProductoValido(actualizado)) {
            throw new Error('Datos del producto inválidos');
        }

        data.Products[index] = actualizado;
        escribirDb(data);
        return { mensaje: "Producto actualizado exitosamente" };
    }

    async eliminarProducto(Id) {
        const data = leerDb();
        const index = data.Products.findIndex(p => p.Id === Id);
        if (index === -1) {
            throw new Error('Producto no encontrado');
        }

        data.Products.splice(index, 1);
        escribirDb(data);
        return { mensaje: "Producto eliminado exitosamente" };
    }
}

module.exports = new ProductoService();