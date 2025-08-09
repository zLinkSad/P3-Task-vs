const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

describe("Formulario de Inicio de Sesión y Registro", () => {
    let document;

    beforeAll(() => {
        const html = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf8");
        const dom = new JSDOM(html, { runScripts: "dangerously" });
        document = dom.window.document;
    });

    test("Debe existir el campo de correo en el formulario de inicio de sesión", () => {
        const emailInput = document.querySelector(".mailLog");
        expect(emailInput).not.toBeNull();
    });

    test("Debe existir el botón de iniciar sesión", () => {
        const loginButton = document.querySelector(".btnLog");
        expect(loginButton).not.toBeNull();
        expect(loginButton.textContent).toBe("Iniciar sesion");
    });

    test("Debe existir el campo de confirmación de contraseña en el formulario de registro", () => {
        const confirmPassInput = document.querySelector(".passConfirmSign");
        expect(confirmPassInput).not.toBeNull();
    });

    test("Debe existir el botón para cambiar a la vista de registro", () => {
        const registerButton = document.getElementById("register");
        expect(registerButton).not.toBeNull();
        expect(registerButton.textContent).toBe("Registrarse");
    });

    test("Debe existir el enlace de recuperación de contraseña", () => {
        const forgotPasswordLink = document.querySelector(".forgot-password");
        expect(forgotPasswordLink).not.toBeNull();
        expect(forgotPasswordLink.textContent.trim()).toBe("Olvidaste tu contraseña?");
    });
    
});
