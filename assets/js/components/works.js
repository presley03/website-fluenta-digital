// assets/js/components/works.js

class WorksPage {
    constructor() {
        this.init();
        this.bindEvents();
    }

    init() {
        // Animate header on page load
        this.animateHeader();

        // Initialize portfolio grid
        this.portfolioGrid = document.querySelector('.works-grid');
        this.renderPortfolio();
    }

    animateHeader() {
        const header = document.querySelector('.works-header');
        header.style.opacity = '0';
        header.style.transform = 'translateY(20px)';

        setTimeout(() => {
            header.style.transition = 'all 0.8s ease';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 100);
    }

    renderPortfolio() {
        // Clear existing content
        this.portfolioGrid.innerHTML = '';

        // Get filtered items from portfolio data
        const items = portfolioData.getFilteredItems();

        items.forEach(item => {
            const card = this.createPortfolioCard(item);
            this.portfolioGrid.appendChild(card);
        });

        // Animate cards
        this.animateCards();
    }

    createPortfolioCard(item) {
        const card = document.createElement('div');
        card.className = 'portfolio-card';
        card.setAttribute('data-category', item.category);

        card.innerHTML = `
            <div class="card-content">
                <span class="card-category">${item.categoryLabel}</span>
                <h3 class="card-title">${item.title}</h3>
                <p class="card-description">${item.description}</p>
                <div class="card-tags">
                    ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="card-overlay">
                <button class="view-details">Lihat Detail</button>
            </div>
        `;

        // Add click event for view details
        const detailsBtn = card.querySelector('.view-details');
        detailsBtn.addEventListener('click', () => this.showProjectDetails(item));

        return card;
    }

    animateCards() {
        const cards = document.querySelectorAll('.portfolio-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });
    }

    showProjectDetails(item) {
        // Implement modal or navigation to detail page
        console.log('Showing details for:', item.title);
        // This can be expanded later based on your needs
    }

    bindEvents() {
        // Bind filter changes
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                portfolioData.setFilter(category);
                this.updateActiveFilter(e.target);
                this.renderPortfolio();
            });
        });
    }

    updateActiveFilter(activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new WorksPage();
});