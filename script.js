document.addEventListener('DOMContentLoaded', function() {
    updateDate();
    registerServiceWorker();
});

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully');
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
}

function updateDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = today.toLocaleDateString('en-IN', options);
    }
}

function toggleChatbot() {
    const chatbot = document.getElementById('chatbotContainer');
    chatbot.classList.toggle('active');
}

function sendMessage() {
    const input = document.getElementById('userMessage');
    const message = input.value.trim();

    if (message === '') return;

    const messagesContainer = document.getElementById('chatMessages');

    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'user-message';
    userMessageDiv.innerHTML = `
        <p>${escapeHtml(message)}</p>
        <span class="timestamp">${getCurrentTime()}</span>
    `;
    messagesContainer.appendChild(userMessageDiv);

    input.value = '';

    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(() => {
        const botResponse = getBotResponse(message.toLowerCase());
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'bot-message';
        botMessageDiv.innerHTML = `
            <p>${botResponse}</p>
            <span class="timestamp">${getCurrentTime()}</span>
        `;
        messagesContainer.appendChild(botMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function getBotResponse(message) {
    if (message.includes('price') || message.includes('rate') || message.includes('cost')) {
        return 'Our current rates are: UltraTech - ₹360/bag, ACC - ₹355/bag, Ambuja - ₹350/bag. All prices include GST.';
    } else if (message.includes('order') || message.includes('buy')) {
        return 'To place an order, please contact us via WhatsApp or call us at +91 9823064024. You can also visit our Bank & Terms page for payment details.';
    } else if (message.includes('payment') || message.includes('bank')) {
        return 'We accept only online payments. Please visit our Bank & Terms page for complete bank account details. All payments must be made to our official account only.';
    } else if (message.includes('delivery')) {
        return 'Delivery is available within 2-3 business days after payment confirmation. Delivery charges may apply based on your location.';
    } else if (message.includes('gst') || message.includes('bill')) {
        return 'Yes, all our bills include GST and are issued with proper GST number and PAN details as per government regulations.';
    } else if (message.includes('return') || message.includes('cancel')) {
        return 'Please note that once an order is placed and confirmed, it cannot be returned or cancelled. Please check our Terms & Conditions page for more details.';
    } else if (message.includes('contact') || message.includes('phone') || message.includes('email')) {
        return 'You can reach us at: Phone: +91 9823064024, Email: info@Cemention.com, or via WhatsApp for quick assistance.';
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return 'Hello! How can I assist you today? You can ask me about cement rates, orders, payment details, or delivery information.';
    } else if (message.includes('thank') || message.includes('thanks')) {
        return 'You\'re welcome! If you have any other questions, feel free to ask.';
    } else {
        return 'Thank you for your message! For specific queries, please contact us via WhatsApp at +91 9823064024 or call us directly. Our team will be happy to assist you.';
    }
}
