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

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
}

function hideNotification() {
    const notification = document.getElementById('notification');
    notification.style.display = 'none';
}

function copiarDados(formId, sectionMessage, footerMessage) {
    const form = document.getElementById(formId);
    let dados = `${sectionMessage}\n`;
    const inputs = form.querySelectorAll('input');
    
    inputs.forEach(input => {
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

function copiarMensagem(mensagem) {
    navigator.clipboard.writeText(mensagem).then(() => {
        showNotification('Mensagem copiada para a área de transferência!');
    }).catch(err => {
        console.error('Erro ao copiar a mensagem: ', err);
    });
}

document.addEventListener('click', hideNotification);
