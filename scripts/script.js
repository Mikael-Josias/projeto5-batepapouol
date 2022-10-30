
const container = document.querySelector(".container");

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
                enviarMensagem({text: "entra na sala...", type: "status"});
                setInterval(pegarMensagens, 3000);
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
        mensagensChat = mensagens.data;

        container.innerHTML = "";
        mensagensChat.forEach(msg => {
            montarMensagem(msg);
        });
    }).catch((err) => {console.log(`Erro ${err.response.status}: Não foi possivel carregar as mensagens`)});
}

function montarMensagem({from, text, time, to, type}){

    let divMsg = document.createElement("div");
    divMsg.classList.add(`mensagem--${type}`);
    divMsg.setAttribute("data-message-type", type);

    let spanHorario = document.createElement("span");
    spanHorario.classList.add("mensagem__horario");
    spanHorario.innerHTML = `(${time})`;
    divMsg.appendChild(spanHorario);
    
    let spanMsgCanal = document.createElement("span");
    spanMsgCanal.classList.add("mensagem__canal");
    spanMsgCanal.innerHTML = type === "status"? `<b>${from}</b> ${text}` : `<b>${from}</b> para <b>${to}</b>:`;
    divMsg.appendChild(spanMsgCanal);

    if (type === "private_message" || type === "message") {
        let pText = document.createElement("p");
        pText.innerHTML = text;

        if (type === "message") {
            divMsg.appendChild(pText);
        }
    }

    if ((type === "message" || type === "status") && (to === usuario.name || to === "Todos")) {
    
        container.appendChild(divMsg);   
    }
}