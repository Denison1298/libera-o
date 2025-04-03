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
    if (activeButton) activeButton.classList.add('active');
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
function copiarDados(formId, sectionMessage = "", footerMessage = "") {
    const form = document.getElementById(formId);
    if (!form) return alert("Erro: Formulário não encontrado!");

    let dados = `${sectionMessage}\n`;
    
    // Seleciona todos os campos do formulário, incluindo inputs e selects
    const campos = form.querySelectorAll('input, select');

    campos.forEach(campo => {
        const label = campo.previousElementSibling; // Pega a <label> anterior ao campo
        if (label && label.tagName === "LABEL") {
            let value = campo.value.trim() === '' ? 'N/A' : campo.value;
            dados += `${label.textContent} ${value}\n`;
        }
    });

    dados += `\n${footerMessage}`;

    // Copiar para a área de transferência
    navigator.clipboard.writeText(dados).then(() => {
        showNotification('✅ Dados copiados para a área de transferência!');
    }).catch(err => {
        console.error('Erro ao copiar os dados: ', err);
    });
}

// Função para limpar campos do formulário
function limparCampos(formId) {
    const form = document.getElementById(formId);
    if (!form) return alert("Erro: Formulário não encontrado!");

    // Seleciona todos os campos do formulário, incluindo inputs e selects
    const campos = form.querySelectorAll('input, select');

    campos.forEach(campo => {
        if (campo.tagName === "SELECT") {
            campo.selectedIndex = 0; // Volta para a opção padrão do <select>
        } else {
            campo.value = ""; // Limpa inputs normais
        }
    });

    showNotification('✅ Todos os campos foram limpos!');
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
document.addEventListener('DOMContentLoaded', function () {
    // Atualizar o nome do atendente ao carregar a página
    atualizarNomeAtendente();
});

// Adicionar evento de clique para ocultar notificações
document.addEventListener('click', hideNotification);
