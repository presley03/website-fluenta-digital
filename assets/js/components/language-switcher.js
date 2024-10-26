const translations = {
    'en': {
        'hero-description': 'We help your business grow through innovative digital solutions. From UI/UX design, mobile and website application development, to social media automation.',
        'about-description': 'We are creative developers from Palangkaraya - Indonesia who enjoy creating attractive, creative, and interactive websites and cellular applications. We can turn your ideas into reality through our development expertise. By adding dynamic elements, we bring life to the work and produce impressive products.',
        'contact-text': 'OR JUST SAY HI',
        'resume-link': '📄 Resume/View — Download ↗',
        // Tambahkan teks lain yang perlu diterjemahkan
    },
    'id': {
        'hero-description': 'Kami membantu bisnis Anda berkembang melalui solusi digital yang inovatif. Dari UI/UX design, pengembangan aplikasi mobile dan website, hingga otomasi media sosial.',
        'about-description': 'Kami adalah developer kreatif asal Palangkaraya - Indonesia yang senang menciptakan website dan aplikasi selular yang menarik, kreatif, dan interaktif. Kami dapat mengubah ide Anda menjadi kenyataan melalui keahlian pengembangan yang kami miliki. Dengan menambahkan elemen dinamis, kami memberi kehidupan pada karya tersebut dan menghasilkan produk yang mengesankan.',
        'contact-text': 'ATAU SEKEDAR MENYAPA',
        'resume-link': '📄 Resume/Lihat — Unduh ↗',
        // Tambahkan teks lain yang perlu diterjemahkan
    }
};

function setLanguage(lang) {
    // Simpan preferensi bahasa
    localStorage.setItem('preferred-language', lang);

    // Update active state pada button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update semua teks yang perlu diterjemahkan
    Object.keys(translations[lang]).forEach(key => {
        const element = document.querySelector(`[data-translate="${key}"]`);
        if (element) {
            element.textContent = translations[lang][key];
        }
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Set bahasa default atau dari localStorage
    const savedLang = localStorage.getItem('preferred-language') || 'id';
    setLanguage(savedLang);

    // Language switcher click handlers
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });
});