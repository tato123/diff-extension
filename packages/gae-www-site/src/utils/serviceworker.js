const deregister = () => {
  if (typeof window !== 'undefined') {
    if (window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
      console.log('Cache cleared');
    }
  }
};

export default {
  deregister
};
