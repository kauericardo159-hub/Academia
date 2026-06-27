(function() {
    'use strict';

    if (typeof emManutencao !== 'undefined' && emManutencao === true) return;

    // 1. Importa a fonte com estilo "Jazz/Handwritten" direto do servidor do Google
    const linkFonte = document.createElement('link');
    linkFonte.rel = 'stylesheet';
    linkFonte.href = 'https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Poppins:wght@400;600;800&display=swap';
    document.head.appendChild(linkFonte);

    // 2. Injeção de Estilos aplicando a nova fonte nos textos
    const estilosFontes = document.createElement('style');
    estilosFontes.textContent = `
        /* Aplica a fonte estilosa em todos os textos normais, botões e listas */
        html, body, p, span, div, button, li, ol, ul, a {
            font-family: 'Patrick Hand', 'Cool Jazz', 'CoolJazz', cursive, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            font-size: 1.15rem; /* Aumentado levemente pois essa fonte costuma ser menor */
        }

        /* --- PROTEÇÃO DO DESIGN ORIGINAL --- */

        /* Garante que os ícones do Font Awesome (se você adicionar no futuro) funcionem perfeitamente */
        .fa, .fas, .far, .fab, .fa-solid, .fa-regular, .fa-brands, i {
            font-family: 'Font Awesome 6 Free', 'Font Awesome 6 Brands', 'Font Awesome' !important;
            font-weight: 900 !important;
        }

        /* Mantém a Poppins estritamente nos títulos e navegação para preservar o design premium */
        h1, h2, h3, h4, 
        .section-title, 
        .custom-nav, 
        .badge,
        .header-content h1 {
            font-family: 'Poppins', sans-serif !important;
        }
    `;

    document.head.appendChild(estilosFontes);
})();
