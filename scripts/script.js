
let logado = false;
let esperandoResposta = false;

let usuario = {
    name: ""
};

let mensagem = {
    from: usuario.name,
    to: "Todos",
    text: "",
    type: "",
};

//====================ENVIAR USUÁRIO AO SERVIDOR==================//

function verificarInput(input) {
    if (input.value.trim() !== "" && input.value !== undefined) {
        return true;
    }

    return false;
}

function enviarUsuario() {
    const input = document.querySelector("#inputUser");
    if (verificarInput(input)) {
        if (!logado) {
            logado = true;
            usuario.name = input.value;

            axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ", usuario)
            .then(() => {
                console.log("Logado");
                setInterval(enviandoStatusUsuario, 5000);
            })
            .catch((err) => {
                alert(`Erro ${err.response.status}: Usuário já cadastrado`);
                logado = false;
            });
        }
    }else{

        alert("Erro: Digite um nome de usuário para entrar!")
    }
}

document.querySelector(".login__entrar").addEventListener("click", enviarUsuario);

function enviandoStatusUsuario() {
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", usuario);
}

//======================ENVIAR MENSAGEM AO SERVIDOR=======================//
