// assets/js/components/filter.js

class FilterSystem {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.init();
    }

    init() {
        this.addFilterAnimation();
        this.handleMobileScroll();
    }

    addFilterAnimation() {
        // Animate filter buttons on page load
        this.filterButtons.forEach((btn, index) => {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(10px)';

            setTimeout(() => {
                btn.style.transition = 'all 0.3s ease';
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }, 300 + (index * 50));
        });
    }

    handleMobileScroll() {
        const filterContainer = document.querySelector('.filter-container');
        let isScrolling = false;

        // Smooth scroll for mobile horizontal scrolling
        filterContainer.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    // Add visual feedback during scroll if needed
                    isScrolling = false;
                });
            }
            isScrolling = true;
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new FilterSystem();
});