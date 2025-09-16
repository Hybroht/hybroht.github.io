// Immediately apply dark theme on page load to prevent flicker
(function() {
    const body = document.body;
    const themeToggleBtn = document.querySelector('.theme-toggle');
    if (!themeToggleBtn) return; // Exit if no toggle button on page

    function setTheme(theme) {
    if (theme === 'dark') {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';// Dark Mode
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';// Light Mode
        localStorage.setItem('theme', 'light');
    }
    }

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
    const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
})();

// Toggle aria-expanded attribute on details summary click for accessibility
document.querySelectorAll('.faq summary').forEach(summary => {
    summary.addEventListener('click', () => {
    const isOpen = summary.parentElement.hasAttribute('open');
    summary.setAttribute('aria-expanded', String(!isOpen));
    });
});