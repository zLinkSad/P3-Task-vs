async function hashPassword(password) {
    // Convertir la contraseña a un ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    
    // Generar el hash usando SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // Convertir el hash a string hexadecimal
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
}

// Ejemplo de uso
async function ejemplo() {
    const password = "darlyn123";
    const hashed = await hashPassword(password);
    console.log(hashed);
}

ejemplo();