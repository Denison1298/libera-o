// Função para copiar os dados preenchidos no formulário
function copiarDados(formId) {
    const formulario = document.getElementById(formId);
    if (!formulario) return alert("Erro: Formulário não encontrado!");

    let dadosParaCopiar = "***** CLOSE REMOÇÃO *****\n\n";
    dadosParaCopiar += `Conferente: Denison Santos\n`;

    // Pega os valores de todos os inputs e selects dentro do formulário
    formulario.querySelectorAll("input, select").forEach(input => {
        const label = input.previousElementSibling; // Pega a label anterior ao campo
        if (label && label.tagName === "LABEL") {
            const textoLabel = label.innerText.trim();
            dadosParaCopiar += `${textoLabel}: ${input.value}\n`;
        }
    });

    // Copiar para a área de transferência
    navigator.clipboard.writeText(dadosParaCopiar)
        .then(() => {
            mostrarAviso("✅ Dados copiados com sucesso!");
        })
        .catch(() => {
            mostrarAviso("❌ Erro ao copiar os dados.");
        });
}

// Função para exibir um aviso na tela
function mostrarAviso(mensagem) {
    let avisoExistente = document.getElementById("aviso-copiado");
    if (avisoExistente) avisoExistente.remove();

    let aviso = document.createElement("div");
    aviso.id = "aviso-copiado";
    aviso.innerText = mensagem;
    aviso.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #28a745;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 16px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        cursor: pointer;
    `;

    document.body.appendChild(aviso);

    setTimeout(() => {
        aviso.remove();
    }, 3000);

    aviso.addEventListener("click", () => aviso.remove());
}

// Função para limpar os campos do formulário
function limparCampos(formId) {
    const formulario = document.getElementById(formId);
    if (!formulario) return alert("Erro: Formulário não encontrado!");

    formulario.querySelectorAll("input, select").forEach(input => {
        if (input.tagName === "SELECT") {
            input.selectedIndex = 0;
        } else {
            input.value = "";
        }
    });

    mostrarAviso("✅ Todos os campos foram limpos!");
}

// Função para exibir a aba clicada
function showTab(tabId) {
    // Ocultar todas as abas
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Desativar todos os botões de aba
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
    
    // Mostrar a aba clicada
    const activeTab = document.getElementById(tabId);
    activeTab.classList.add('active');
    
    // Ativar o botão da aba clicada
    const activeButton = document.querySelector(`.tab-button[onclick="showTab('${tabId}')"]`);
    activeButton.classList.add('active');
}

// Função para mostrar notificações
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
}

// Função para ocultar notificações
function hideNotification() {
    const notification = document.getElementById('notification');
    notification.style.display = 'none';
}

// Função para copiar dados do formulário para a área de transferência
function copiarDados(formId, sectionMessage, footerMessage) {
    const form = document.getElementById(formId);
    let dados = `${sectionMessage}\n`;
    const inputs = form.querySelectorAll('input');
    
    inputs.forEach(input => {
        // Verifica se o campo OBS está vazio e define "N/A" se necessário
        let value = input.value.trim() === '' ? 'N/A' : input.value;
        dados += `${input.previousElementSibling.textContent} ${value}\n`;
    });
    
    dados += `\n${footerMessage}`;
    
    navigator.clipboard.writeText(dados).then(() => {
        showNotification('Dados copiados para a área de transferência!');
    }).catch(err => {
        console.error('Erro ao copiar os dados: ', err);
    });
}

// Função para limpar campos do formulário
function limparCampos(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input');
    
    inputs.forEach(input => {
        if (input.defaultValue === '') {
            input.value = '';
        } else {
            input.value = input.defaultValue;
        }
    });
}

// Função para copiar mensagem para a área de transferência
function copiarMensagem(mensagem) {
    navigator.clipboard.writeText(mensagem).then(() => {
        showNotification('Mensagem copiada para a área de transferência!');
    }).catch(err => {
        console.error('Erro ao copiar a mensagem: ', err);
    });
}

// Função para alterar o nome do atendente nas mensagens de saudação
function alterarNomeAtendente() {
    var nomeAtendente = document.getElementById("nomeAtendente").value || "Denison"; // Nome padrão "Denison" se não for preenchido
    
    // Armazenar o nome no localStorage
    localStorage.setItem('nomeAtendente', nomeAtendente);
    
    // Atualiza as mensagens de saudação com o novo nome
    atualizarNomeAtendente();
}

// Função para atualizar o nome do atendente nas mensagens ao carregar a página
function atualizarNomeAtendente() {
    var nomeAtendente = localStorage.getItem('nomeAtendente') || "Denison"; // Nome padrão "Denison" se não estiver no localStorage
    
    const bomDiaTexto = `Bom dia, Sou o atendente ${nomeAtendente}, vou ser responsável pelo seu atendimento. ✅`;
    const boaTardeTexto = `Boa tarde, Sou o atendente ${nomeAtendente}, vou ser responsável pelo seu atendimento. ✅`;
    
    document.getElementById("msgBomDia").textContent = bomDiaTexto;
    document.getElementById("msgBoaTarde").textContent = boaTardeTexto;

    // Adicionar evento de clique para copiar o texto dos botões
    document.getElementById("msgBomDia").onclick = () => copiarMensagem(bomDiaTexto);
    document.getElementById("msgBoaTarde").onclick = () => copiarMensagem(boaTardeTexto);
}

// Inicializar a página
document.addEventListener('DOMContentLoaded', function() {
    // Atualizar o nome do atendente ao carregar a página
    atualizarNomeAtendente();
});

// Adicionar evento de clique para ocultar notificações
document.addEventListener('click', hideNotification);
