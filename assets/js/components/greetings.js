class MultilingualGreeting {
    constructor() {
        this.greetings = [
            { text: "HELLO", code: "EN" },
            { text: "APA KABAR", code: "ID" },
            { text: "你好", code: "CN" },
            { text: "こんにちは", code: "JP" },
            { text: "HOLA", code: "ES" },
            { text: "BONJOUR", code: "FR" }
        ];

        this.currentIndex = 0;
        this.greetingElement = document.getElementById('multilingualGreeting');

        if (this.greetingElement) {
            this.init();
        }
    }

    init() {
        // Initial greeting
        this.updateGreeting();

        // Start rotation
        setInterval(() => {
            this.updateGreeting();
        }, 1500);
    }

    updateGreeting() {
        const greeting = this.greetings[this.currentIndex];

        this.greetingElement.style.opacity = 0;

        setTimeout(() => {
            this.greetingElement.innerHTML = `
                <span class="greeting-text">${greeting.text}</span>
                <span class="language-code">${greeting.code}</span>
            `;
            this.greetingElement.style.opacity = 1;
            this.currentIndex = (this.currentIndex + 1) % this.greetings.length;
        }, 500);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MultilingualGreeting();
});