/* ==========================================================================
   Scripts Dinâmicos - PetShop Amigo Fiel (Fase 2)
   Autora: Simone Barros
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    
    // 1. INICIALIZAÇÃO DA FUNÇÃO TEMPORAL (Relógio e Status de Funcionamento)
    atualizarStatusFuncionamento();
    setInterval(atualizarStatusFuncionamento, 1000);

    // 2. CONFIGURAÇÃO DO CALENDÁRIO (Impede agendamento em datas passadas)
    configurarDataMinima();

    // 3. MÁSCARAS DE ENTRADA PARA CPF E TELEFONE
    aplicarMascaras();

    // 4. MANIPULAÇÃO DO ENVIO DO FORMULÁRIO DE AGENDAMENTO
    const formAgendamento = document.getElementById("formAgendamento");
    if (formAgendamento) {
        formAgendamento.addEventListener("submit", processarAgendamento);
    }

    // 5. CONTROLE DO CARROSSEL (Funciona mesmo sem depender do Bootstrap JS)
    iniciarCarrossel();
});

function iniciarCarrossel() {
    const slides = document.querySelectorAll("#carrosselPetshop .carousel-item");
    const indicadores = document.querySelectorAll("#carrosselPetshop .carousel-indicators button");
    const btnProximo = document.querySelector("#carrosselPetshop .carousel-control-next");
    const btnAnterior = document.querySelector("#carrosselPetshop .carousel-control-prev");
    let indiceAtual = 0;

    if (slides.length === 0) return;

    function mostrarSlide(novoIndice) {
        slides[indiceAtual].classList.remove("active");
        if (indicadores[indiceAtual]) indicadores[indiceAtual].classList.remove("active");

        indiceAtual = (novoIndice + slides.length) % slides.length;

        slides[indiceAtual].classList.add("active");
        if (indicadores[indiceAtual]) indicadores[indiceAtual].classList.add("active");
    }

    if (btnProximo) {
        btnProximo.addEventListener("click", function (e) {
            e.preventDefault();
            mostrarSlide(indiceAtual + 1);
        });
    }

    if (btnAnterior) {
        btnAnterior.addEventListener("click", function (e) {
            e.preventDefault();
            mostrarSlide(indiceAtual - 1);
        });
    }

    // Troca automática a cada 3,5 segundos
    setInterval(function () {
        mostrarSlide(indiceAtual + 1);
    }, 3500);
}

function atualizarStatusFuncionamento() {
    const elementoStatus = document.getElementById("status-funcionamento");
    if (!elementoStatus) return;

    const agora = new Date();
    const diaSemana = agora.getDay();
    const hora = agora.getHours();
    const horaFormatada = agora.toLocaleTimeString("pt-BR");

    const estaAberto = (diaSemana >= 1 && diaSemana <= 6) && (hora >= 8 && hora < 18);

    if (estaAberto) {
        elementoStatus.innerHTML = `🟢 Aberto agora (${horaFormatada}) - Agende seu horário!`;
        elementoStatus.className = "fw-bold text-success";
    } else {
        elementoStatus.innerHTML = `🔴 Fechado no momento (${horaFormatada}) - Agendamentos online disponíveis 24h`;
        elementoStatus.className = "fw-bold text-danger";
    }
}

function configurarDataMinima() {
    const campoData = document.getElementById("dataAgendamento");
    if (campoData) {
        const hoje = new Date().toISOString().split("T")[0];
        campoData.setAttribute("min", hoje);
    }
}

function aplicarMascaras() {
    const cpfInput = document.getElementById("cpfCliente");
    const telInput = document.getElementById("telefoneCliente");

    if (cpfInput) {
        cpfInput.addEventListener("input", function (e) {
            let valor = e.target.value.replace(/\D/g, "");
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            e.target.value = valor;
        });
    }

    if (telInput) {
        telInput.addEventListener("input", function (e) {
            let valor = e.target.value.replace(/\D/g, "");
            valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
            valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");
            e.target.value = valor;
        });
    }
}

function processarAgendamento(event) {
    event.preventDefault();

    const nomeCliente = document.getElementById("nomeCliente").value;
    const telefoneCliente = document.getElementById("telefoneCliente").value;
    const enderecoCliente = document.getElementById("enderecoCliente").value;

    const nomePet = document.getElementById("nomePet").value;
    const racaPet = document.getElementById("racaPet").value;
    const idadePet = document.getElementById("idadePet").value;
    const temAlergia = document.getElementById("petAlergia").checked ? "Sim (Cuidados especiais)" : "Não";

    const servico = document.querySelector('input[name="servicoEscolhido"]:checked').value;
    const metodo = document.querySelector('input[name="metodoAgendamento"]:checked').value;

    const dataBruta = document.getElementById("dataAgendamento").value;
    const dataPartes = dataBruta.split("-");
    const dataFormatada = `${dataPartes[2]}/${dataPartes[1]}/${dataPartes[0]}`;
    const hora = document.getElementById("horaAgendamento").value;

    const caixaMensagem = document.getElementById("mensagemConfirmacao");
    caixaMensagem.innerHTML = `
        <h4 class="alert-heading">✅ Agendamento Confirmado com Sucesso!</h4>
        <p>Olá, <strong>${nomeCliente}</strong>! Recebemos a solicitação para o atendimento do seu pet.</p>
        <hr>
        <ul class="mb-0">
            <li><strong>Pet:</strong> ${nomePet} (${racaPet}, ${idadePet} ano(s)) | <strong>Alergia/Cuidados:</strong> ${temAlergia}</li>
            <li><strong>Serviço Escolhido:</strong> ${servico}</li>
            <li><strong>Modalidade:</strong> ${metodo} ${metodo === "Tele-busca" ? `(Endereço: ${enderecoCliente})` : "(No PetShop)"}</li>
            <li><strong>Data e Horário:</strong> ${dataFormatada} às ${hora}</li>
            <li><strong>Contato para confirmação:</strong> ${telefoneCliente}</li>
        </ul>
    `;

    caixaMensagem.classList.remove("d-none");
    caixaMensagem.scrollIntoView({ behavior: "smooth" });
}