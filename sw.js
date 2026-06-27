const CACHE_NAME = 'femboy-routine-v2';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js', // Atualizado de app.js para script.js que é o seu arquivo real
    './manifest.json',
    './fundo.png'
];

// Instala o Service Worker e guarda os arquivos essenciais em cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aberto com sucesso!');
                return cache.addAll(urlsToCache);
            })
    );
});

// Estratégia Network-First: Busca da internet para garantir atualizações em tempo real.
// Se a internet falhar (offline), ele carrega o que estiver salvo no cache.
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Se a resposta for válida, atualiza o cache dinamicamente
                if (response && response.status === 200 && event.request.method === 'GET') {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return response;
            })
            .catch(() => {
                // Se a internet falhar/estiver offline, busca no cache
                return caches.match(event.request);
            })
    );
});

// Limpa caches antigos quando uma nova versão do app for lançada
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
