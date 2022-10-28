
const inputUser = document.querySelector("#inputUser");
const btnEntrar = document.querySelector(".login__entrar")

let usuario = {
    nome: "",
}

const validarInput = () => {
    if (inputUser.value.trim() !== "" && inputUser.value !== undefined) {
        
        return true;
    }

    return false;
};



btnEntrar.addEventListener("click", validarInput);