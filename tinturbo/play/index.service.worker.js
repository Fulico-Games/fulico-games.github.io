// Desativa o jogo já guardado nos aparelhos: apaga o cache da produção, sai do caminho e recarrega a página.
// Os dados salvos do jogador não são apagados.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
	event.waitUntil((async () => {
		const names = await caches.keys();
		await Promise.all(names.filter((name) => name.startsWith('Tinturbo-sw-cache-')).map((name) => caches.delete(name)));
		await self.clients.claim();
		const pages = await self.clients.matchAll({ type: 'window' });
		await self.registration.unregister();
		for (const page of pages) {
			page.navigate(page.url).catch(() => {});
		}
	})());
});
