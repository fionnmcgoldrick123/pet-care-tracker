// Menu toggle functionality
const centerIcon = document.querySelector('.center-icon');
const circleMenu = document.querySelector('.circle-menu');
let isMenuOpen = false;

centerIcon.addEventListener('click', function() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        circleMenu.classList.add('active');
    } else {
        circleMenu.classList.remove('active');
    }
});

// Chat functionality
const chatContainer = document.getElementById('chatContainer');
const chatOverlay = document.getElementById('chatOverlay');
const chatClose = document.getElementById('chatClose');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');

// Handle circle item clicks
document.querySelectorAll('.circle-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.stopPropagation();
        const action = this.getAttribute('data-action');
        
        if (action === 'chat') {
            openChat();
        } else if (action === 'calendar') {
            console.log('Calendar clicked');
            // Add calendar functionality here
        } else if (action === 'exercise') {
            console.log('Exercise clicked');
            // Add exercise functionality here
        }
    });
});

function openChat() {
    chatContainer.classList.add('active');
    chatOverlay.classList.add('active');
    document.body.classList.add('chat-open');
    chatInput.focus();
}

function closeChat() {
    chatContainer.classList.remove('active');
    chatOverlay.classList.remove('active');
    document.body.classList.remove('chat-open');
}

// Close chat button
chatClose.addEventListener('click', closeChat);

// Close chat when clicking overlay
chatOverlay.addEventListener('click', closeChat);

// Send message function
function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;

    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';

    // Simulate bot response after a delay
    setTimeout(() => {
        const botResponse = getBotResponse(message);
        addMessage(botResponse, 'bot');
    }, 800);
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    bubbleDiv.textContent = text;
    
    messageDiv.appendChild(bubbleDiv);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message on button click
chatSend.addEventListener('click', sendMessage);

// Send message on Enter key
chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Logout function
function handleLogout() {
    console.log('Logging out...');
    // Add your logout logic here
    // Example: window.location.href = 'login.html';
}