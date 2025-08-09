const db = {
    "Usersss": { "schema": { /* Definición de la tabla */ }, "data": [] },
    "Clients": { "schema": { /* Definición de la tabla */ }, "data": [] },
    "Products": { "schema": { /* Definición de la tabla */ }, "data": [] }
  };
  
  function addData(tableName, newData) {
      if (db[tableName]) {
          db[tableName].data.push(newData);
          console.log(`✅ Registro agregado a ${tableName}:`, newData);
      } else {
          console.error(`❌ La tabla ${tableName} no existe.`);
      }
  }
  
  // Agregar usuarios
  addData("Usersss", { Id: 1, Name: "Juan", UserName: "juan123", Password: "abc123" });
  addData("Usersss", { Id: 2, Name: "Maria", UserName: "maria456", Password: "xyz789" });
  
  // Agregar clientes
  addData("Clients", { Id: 1, Name: "Carlos", LastName: "Perez", DNI: "12345678900" });
  addData("Clients", { Id: 2, Name: "Ana", LastName: "Gomez", DNI: "09876543211" });
  
  // Agregar productos
  addData("Products", { Id: 1, Namee: "Laptop", Price: 999.99, Description: "Laptop gaming" });
  addData("Products", { Id: 2, Namee: "Mouse", Price: 19.99, Description: "Mouse inalámbrico" });
  
  console.log(JSON.stringify(db.Usersss, null, 2)); // Mostrar la base de datos actualizada
  