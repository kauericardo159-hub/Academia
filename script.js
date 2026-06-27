// ==========================================
// 1. LÓGICA DO TEMA (DARK / LIGHT MODE)
// ==========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.remove('dark-theme');
    if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
} else {
    body.classList.add('dark-theme');
    if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
}

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

// ==========================================
// 2. SISTEMA DE NAVEGAÇÃO ENTRE PAINÉIS
// ==========================================
const navItems = document.querySelectorAll('.nav-item');
const panels = document.querySelectorAll('.panel');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(nav => nav.classList.remove('active'));
        panels.forEach(panel => panel.classList.remove('active'));

        item.classList.add('active');
        const targetId = item.getAttribute('data-target');
        const targetPanel = document.getElementById(targetId);
        
        if (targetPanel) {
            targetPanel.classList.add('active');
            
            // Rola a tela suavemente para o topo do painel
            window.scrollTo({
                top: targetPanel.offsetTop - 140, 
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// 3. CRONÔMETRO FLUTUANTE DE DESCANSO
// ==========================================
let timerInterval;
let seconds = 0;
let isRunning = false;

const timerWidget = document.getElementById('floating-timer');
const timerText = document.getElementById('timer-text');
const btnStart = document.getElementById('btn-start');
const btnPause = document.getElementById('btn-pause');
const btnReset = document.getElementById('btn-reset');

function updateDisplay() {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    if (timerText) timerText.textContent = `${mins}:${secs}`;
}

if (btnStart) {
    btnStart.addEventListener('click', () => {
        if (!isRunning) {
            isRunning = true;
            if (timerWidget) timerWidget.classList.add('timer-running');
            timerInterval = setInterval(() => {
                seconds++;
                updateDisplay();
            }, 1000);
        }
    });
}

if (btnPause) {
    btnPause.addEventListener('click', () => {
        isRunning = false;
        if (timerWidget) timerWidget.classList.remove('timer-running');
        clearInterval(timerInterval);
    });
}

if (btnReset) {
    btnReset.addEventListener('click', () => {
        isRunning = false;
        if (timerWidget) timerWidget.classList.remove('timer-running');
        clearInterval(timerInterval);
        seconds = 0;
        updateDisplay();
    });
}

// ==========================================
// 4. CALCULADORA DE NUTRIÇÃO INTERATIVA
// ==========================================
const btnCalc = document.getElementById('btn-calc');
const weightInput = document.getElementById('weight-input');
const resProtein = document.getElementById('res-protein');
const resWater = document.getElementById('res-water');
const resCalories = document.getElementById('res-calories');

if (btnCalc && weightInput) {
    btnCalc.addEventListener('click', () => {
        const weight = parseFloat(weightInput.value) || 60;
        
        // Fórmulas personalizadas para a estética do app
        const proteinMeta = Math.round(weight * 2);             // 2g por kg
        const waterMeta = ((weight * 40) / 1000).toFixed(1);    // 40ml por kg
        const caloriesMeta = Math.round(weight * 40);           // Superávit limpo base

        if (resProtein) resProtein.textContent = `${proteinMeta}g`;
        if (resWater) resWater.textContent = `${waterMeta} L`;
        if (resCalories) resCalories.textContent = `${caloriesMeta} kcal`;
    });
}

// ==========================================
// 5. REGISTRO DO SERVICE WORKER (PWA)
// ==========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('PWA: Service Worker ativo para uso offline!', reg.scope))
            .catch(err => console.log('PWA: Falha ao registrar o SW:', err));
    });
}
