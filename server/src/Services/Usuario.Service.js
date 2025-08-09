const path = require('path');
const {registrarUsuario} = require('../Interfaces/Usuario.Interface');
const fs = require('fs');
const rutaDb = path.join(__dirname, '../Migrations/DbFile.json');

function leerDb(){
    const content = fs.readFileSync(rutaDb, 'utf-8');
    return JSON.parse(content);
}

function escribirDb(data){
    fs.writeFileSync(rutaDb, JSON.stringify(data, null, 2));
}

class UsuarioService {
    async crearUsuario(Nombre, UserName, Password){
        console.log("Datos recibidos en crearUsuario", {Nombre, UserName, Password});

        const nuevoUsuario = {Nombre, UserName, Password};
        console.log("Objeto nuevoUsuario antes de validar: ", nuevoUsuario);

        //validamos los tipos de la funcion de la interfaz
        if(!registrarUsuario({Id: 0, ...nuevoUsuario})){
            throw new Error("Datos del usuario invalidos");
        }

        try {
            const data = leerDb();
            const usuarios = data.Users;

            //generamos nuevo ID
            const nuevoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].Id + 1 : 1;

            const usuarioInsertado = {
                Id: nuevoId,
                Nombre,
                UserName,
                Password
            }
            usuarios.push(usuarioInsertado);
            escribirDb(data);

            return usuarioInsertado;
        } catch (error) {
            throw new Error('Error al guardar el usuario en el archivo JSON: ' + error.message);
        }
    }

    async obtenerUsuarios(){
        try {
            const data = leerDb();
            return data.Users;
        } catch (error) {
            throw new Error('Error al obtener los usuarios del archivo JSON: ' + error.message);
        }
    }
}

module.exports = new UsuarioService();