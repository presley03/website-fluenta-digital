// assets/js/components/portfolio.js

const portfolioData = {
    currentFilter: 'all',

    items: [
        {
            id: 1,
            title: "E-commerce App Redesign",
            category: "ui-ux",
            categoryLabel: "UI/UX Design",
            description: "Redesign UI/UX untuk meningkatkan conversion rate dan user experience",
            tags: ["Figma", "Prototype", "User Research"],
            image: "assets/images/works/ecommerce-redesign.jpg"
        },
        {
            id: 2,
            title: "Smart City Mobile App",
            category: "mobile",
            categoryLabel: "Mobile App",
            description: "Aplikasi Flutter untuk manajemen kota pintar dengan integrasi IoT",
            tags: ["Flutter", "Firebase", "Maps API"],
            image: "assets/images/works/smart-city.jpg"
        },
        {
            id: 3,
            title: "Corporate Website",
            category: "web",
            categoryLabel: "Website",
            description: "Website responsif dengan animasi modern dan performa tinggi",
            tags: ["HTML5", "CSS3", "JavaScript"],
            image: "assets/images/works/corporate-web.jpg"
        },
        {
            id: 4,
            title: "Social Media Manager",
            category: "automation",
            categoryLabel: "Automation",
            description: "Sistem otomasi untuk manajemen posting multi-platform",
            tags: ["Make.com", "API Integration"],
            image: "assets/images/works/social-automation.jpg"
        }
    ],

    setFilter(category) {
        this.currentFilter = category;
    },

    getFilteredItems() {
        if (this.currentFilter === 'all') {
            return this.items;
        }
        return this.items.filter(item => item.category === this.currentFilter);
    }
};