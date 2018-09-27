const settings = {
  AUTH0_DOMAIN: 'diff.auth0.com',
  AUTH0_CLIENT_ID: 'hza50RUb2qA-F5dZ4cuBVH324yMzuURc'
};

chrome.runtime.onMessage.addListener(event => {
  if (event.type === 'authenticate') {
    // scope
    //  - openid if you want an ID Token returned
    //  - offline_access if you want a Refresh Token returned
    // device
    //  - required if requesting the offline_access scope.
    const options = {
      scope: 'openid offline_access',
      device: 'chrome-extension'
    };

    new Auth0Chrome(settings.AUTH0_DOMAIN, settings.AUTH0_CLIENT_ID)
      .authenticate(options)
      .then(authResult => {
        localStorage.authResult = JSON.stringify(authResult);
        chrome.notifications.create({
          type: 'basic',
          iconUrl: '../images/icon_128.png',
          title: 'Login Successful',
          message: 'You can use the app now'
        });
      })
      .catch(err => {
        chrome.notifications.create({
          type: 'basic',
          title: 'Login Failed',
          message: err.message,
          iconUrl: '../images/icon_128.png'
        });
      });
  }
});
