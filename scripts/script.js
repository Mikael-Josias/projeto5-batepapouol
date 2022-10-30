
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

let mensagensChat = [];

//====================ENVIAR USUÁRIO AO SERVIDOR==================//

function verificarInput(input) {
    if (input.value.trim() !== "" && input.value !== undefined) {
        return true;
    }

    return false;
}

function mostrarChat() {
    const login = document.querySelector(".login");
    login.classList.add("esconder");
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
                enviarMensagem({text: "entra na sala..."});
                pegarMensagens();
                mostrarChat();
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

function enviarMensagem({to = "Todos", text = "",type = "message"}) {
    const input = document.querySelector("#inputMensagem");
    console.log("1");
    if (verificarInput(input) || text !== "") {
        console.log("2");
        mensagem.from = usuario.name;
        mensagem.to = to;
        mensagem.text = text === ""? input.value: text;
        mensagem.type = type;

        if (!esperandoResposta) {
            esperandoResposta = true;
            console.log("3");
            axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagem)
            .then(() => {console.log("Enviado"); esperandoResposta = false;})
            .catch(() => {console.log("Erro"); esperandoResposta = false;});
        }
    }
}

function pegarMensagens() {
    axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    .then((mensagens) => {
        console.log(mensagens.data);
    }).catch(() => {console.log("Deu Erro!")});
}