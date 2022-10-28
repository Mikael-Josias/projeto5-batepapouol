
const inputUser = document.querySelector("#inputUser");
const btnEntrar = document.querySelector(".login__entrar")

let usuario = {
    name: ""
}

const validarInput = () => {
    if (inputUser.value.trim() !== "" && inputUser.value !== undefined) {
        usuario.name = inputUser.value;

        return true;
    }

    return false;
};

const mostrarChat = () => {
    const login = document.querySelector(".login");

    login.classList.add("esconder");
}

const enviarUsuario = () => {

    axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", usuario)
    .then(mostrarChat())
    .catch(() => {console.log("erro")});
}

btnEntrar.addEventListener("click", () => {
    if (validarInput()) {
        
        enviarUsuario();
    }else{
        alert("Nome de usuário inválido");
    }
});