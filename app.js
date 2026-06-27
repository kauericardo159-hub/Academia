// ==========================================================================
// REMOÇÃO DE SERVICE WORKERS ANTIGOS (Garante atualizações online imediatas)
// ==========================================================================
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
            registration.unregister();
            console.log('Service Worker antigo removido para garantir o carregamento em tempo real.');
        }
    });
}

// ==========================================================================
// LÓGICA DO TEMA (Estética Femboy Premium - Dark / Light)
// ==========================================================================
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Verifica se o usuário já tinha uma preferência salva anteriormente
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.remove('dark-theme');
    if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
} else {
    // Por padrão, manter o tema escuro que destaca os efeitos Neon
    body.classList.add('dark-theme');
    if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
}

// Ouvinte de clique para alternar entre os modos de cor
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggleBtn.textContent = '🌙';
        }
    });
}
