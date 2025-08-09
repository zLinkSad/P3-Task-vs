

// Definición de la interfaz del producto
const Producto = {
    Id: String,
    Name: String,
    Price: Number,
    Description: String
};

// Exportamos una función para validar si un objeto cumple con la interfaz
function esProductoValido(obj) {
    return (
        typeof obj.Id === 'string' &&
        typeof obj.Name === 'string' &&
        typeof obj.Price === 'number' &&
        typeof obj.Description === 'string'
    );
}

module.exports = { Producto, esProductoValido };