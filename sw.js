// StudyPlan Service Worker
const CACHE='study-plan-v1';
const urls=['/', '/index.html'];

self.addEventListener('install',e=>{
    e.waitUntil(caches.open(CACHE).then(c=>c.addAll(urls)));
});

self.addEventListener('fetch',e=>{
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});

self.addEventListener('push',e=>{
    const d=e.data?.json()||{};
    self.registration.showNotification(d.title||'学习提醒',{
        body:d.body||'该开始学习了！',
        icon:'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">📚</text></svg>',
        tag:'study-reminder'
    });
});

self.addEventListener('notificationclick',e=>{
    e.notification.close();
    e.waitUntil(clients.openWindow('/'));
});
