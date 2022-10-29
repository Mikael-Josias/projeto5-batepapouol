
let esperandoPromisse = false;
const btnEntrar = document.querySelector(".login__entrar");

const btnEviarMensagem = document.querySelector("#btnEnviar");

let usuario = "";

let mensagem = {
    from: "",
	to: "",
	text: "",
	type: ""
}

const validarInput = (input) => {

    if (input.value.trim() !== "" && input.value !== undefined) {
        return true;
    }

    return false
}

const logar = () => {
    const login = document.querySelector(".login");

    login.classList.add("esconder");
}

const enviarUsuario = () => {

    if (validarInput(document.querySelector("#inputUser"))) {
        
        usuario = {
            name: document.querySelector("#inputUser").value,
        }
        
        if (!esperandoPromisse) {
            esperandoPromisse = true;

            axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", usuario)
            .then(logar)
            .catch((erro) => {
                alert(`Erro ${erro.response.status}: Nome de usuário já cadastrado!`);
            })
            .then(() => {esperandoPromisse = false;});
        }
    }else{
        alert(`Digite um nome de usuário para entrar!`);
    }
}

btnEntrar.addEventListener("click", enviarUsuario);

//===========================================================//

const buscarMensagens = () => {
    
    axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    .then((prom) => {
        console.log(prom)
    })
    .catch(() => {alert("Erro")});
}

const carregarMensagens = (mensagens) => {
    console.log(mensagens);
}

const enviarMensagem = ({from, to, text, type}) => {
    let mensagem = {
        from: from,
        to: to,
        text: text,
        type: type,
        time: "01:02:03"
    }

    axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagem)
    .then(() => {
        console.log("Mensagem Enviada");
    })
    .catch(() => {
        console.log("Mensagem deu Erro");
    });
}

btnEviarMensagem.addEventListener("click", () => {

});