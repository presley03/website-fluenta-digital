document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.querySelector('.skills-section');
    const bg = document.querySelector('.skills-bg');

    // Background follow cursor effect
    skillsSection.addEventListener('mousemove', (e) => {
        const rect = skillsSection.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        bg.style.setProperty('--x', `${x}% `);
        bg.style.setProperty('--y', `${y}% `);
    });

    // Add glitch effect on hover
    const skillLines = document.querySelectorAll('.skill-line');
    skillLines.forEach(skill => {
        skill.addEventListener('mouseover', () => {
            skill.style.transform = `translateX(10px) scale(1.02)`;
            setTimeout(() => {
                skill.style.transform = 'translateX(10px) scale(1)';
            }, 150);
        });
    });
});