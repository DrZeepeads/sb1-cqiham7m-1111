import { registerSW } from 'virtual:pwa-register';

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    registerSW({
      onNeedRefresh() {
        // Show a notification to the user that there's an update available
        console.log('New content available, please refresh');
      },
      onOfflineReady() {
        // Notify user that the app is ready for offline use
        console.log('App ready for offline use');
      },
    });
  }
}