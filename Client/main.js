// conexion a la API

const URL_Sign = "/api/usuarios/create"; //para registrarse y para loguearse utilizare esta url
const url_log = "/api/usuarios";

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');


const login = {
    email: document.querySelector("mailLog"),
    pass: document.querySelector("PassLog"),
}

const inputs = {
    mailLog: document.querySelector(".mailLog"),
    passLog: document.querySelector(".passLog"),
    nombreSign: document.querySelector(".nombreSign"),
    mailSign: document.querySelector(".mailSign"),
    passSign: document.querySelector(".passSign"),
    passConfirmSign: document.querySelector(".passConfirmSign"),
    nombreSign: document.querySelector(".nombreSign"),
    
}

const btns = {
    btnLog: document.querySelector(".btnLog"),
    btnSign: document.querySelector(".btnSign"),
}




fetch(url_log)
.then(res => res.json())
.then(data => {
    data.forEach(element => {
        console.log(element);
    });
})


//login completado

function iniciarSesion(){
    let mail = inputs.mailLog.value;
    let pass = inputs.passLog.value;
    

    fetch(url_log)
    .then(res => res.json())
    .then(data => {

        for(let i = 0; i < data.length; i++){
            if(mail == data[i].UserName && pass == data[i].Password){
                swal({
                    title: "Inicio de sesion con exito!",
                    text: `Bienvenido ${data[i].Nombre}`,
                    icon: "success",
                })
                .then(res => {
    
    
                    console.log("success", res);
                    window.location = "./home.html";
                })
            }

        }

    })

}




function registrarse(){

    let nombre = inputs.nombreSign.value;
    let user = inputs.mailSign.value;
    let pass = inputs.passSign.value;
    let confirm = inputs.passConfirmSign.value;



    const model = {
        "Nombre" : nombre,
        "UserName" : user,
        "Password" : pass
    };

    if(pass == confirm){ // si las 2 contrase?as son iguales procede a crear la cuenta
        fetch(URL_Sign, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(model)
        })
        .then(res => {
    
            if(nombre == "" || user == "" || pass == "" || confirm == ""){
                swal({
                    title: "ERROR!",
                    text: "no puede haber campos vacíos \n O no podemos encontrar su cuenta \n O crea una",
                    icon: "warning",
                })
            } else {
        
                swal({
                    title: "Cuenta creada con exito!",
                    text: "Su cuenta ha sido creada exitosamente!",
                    icon: "success",
                })
                .then(res => {
                    window.location = "./index.html";
                })
            }
    
        })
        .catch(err => console.error("error: ", err));
    } else {
        swal({
            title: "ERROR!",
            text: "Las contrase?as no coinciden",
            icon: "warning",
        })
    }

}


btns.btnLog.addEventListener("click", () => {
    event.preventDefault();
    iniciarSesion();

})

btns.btnSign.addEventListener("click", () => {
    event.preventDefault();
    registrarse();
})



//estos son los cambios de contenido de registrarse o iniciar sesion
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});