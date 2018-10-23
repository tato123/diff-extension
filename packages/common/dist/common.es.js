import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Observable, from } from 'rxjs';
import jwtDecode from 'jwt-decode';
import _ from 'lodash-es';
import 'firebase/storage';
import auth0 from 'auth0-js';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

const namespacedAction = name => `@diff/common/${name}`;

const asyncAction = actionType => ({
  REQUEST: namespacedAction(`${actionType}/request`),
  SUCCESS: namespacedAction(`${actionType}/success`),
  FAILED: namespacedAction(`${actionType}/failed`)
});

var types = {
  FETCH_USER_PREFERENCES: asyncAction('fetchUserPreferences'),
  RUN_REQUEST: asyncAction('runRequest'),
  LOGIN: asyncAction('login'),
  CACHE_TOKEN: asyncAction('cacheToken'),
  FETCH_CACHE_TOKEN: asyncAction('fetchCacheToken'),
  FEATURE_FLAGS_UPDATE: 'featureFlagUpdate',
  GET_FIREBASE_TOKEN: asyncAction('firebaseToken')
};

const composeRemoteAction = (action, source, dest) => _objectSpread({
  source,
  dest
}, action); // -------------------------------------------------------
// User actions
// -------------------------------------------------------


const runRequest = () => ({
  type: types.RUN_REQUEST.REQUEST
}); // -------------------------------------------------------
// User actions
// -------------------------------------------------------


const fetchUserPreferences = (hostname, pathname) => ({
  type: types.FETCH_USER_PREFERENCES.REQUEST,
  payload: {
    hostname,
    pathname
  }
});

const fetchUserPreferencesSuccess = preferences => ({
  type: types.FETCH_USER_PREFERENCES.SUCCESS,
  payload: _objectSpread({}, preferences)
});

const fetchUserPreferencesFailed = error => ({
  type: types.FETCH_USER_PREFERENCES.FAILED,
  payload: {
    error
  }
}); // -------------------------------------------------------
// Set cache token actions
// -------------------------------------------------------


const cacheTokenRequest = token => ({
  type: types.CACHE_TOKEN.REQUEST,
  payload: {
    token
  }
});

const cacheTokenFailed = error => ({
  type: types.CACHE_TOKEN.FAILED,
  payload: {
    error
  }
});

const cacheTokenSuccess = () => ({
  type: types.CACHE_TOKEN.SUCCESS
}); // -------------------------------------------------------
// get cache token actions
// -------------------------------------------------------


const fetchCacheToken = () => ({
  type: types.FETCH_CACHE_TOKEN.REQUEST
});

const fetchCacheTokenFailed = error => ({
  type: types.FETCH_CACHE_TOKEN.FAILED,
  payload: {
    error
  }
});

const fetchCacheTokenSuccess = token => ({
  type: types.FETCH_CACHE_TOKEN.SUCCESS,
  payload: {
    token
  }
});

var actions = {
  composeRemoteAction,
  runRequest,
  fetchUserPreferences,
  fetchUserPreferencesSuccess,
  fetchUserPreferencesFailed,
  cacheTokenRequest,
  cacheTokenFailed,
  cacheTokenSuccess,
  fetchCacheToken,
  fetchCacheTokenFailed,
  fetchCacheTokenSuccess
};

const CONTENT_SCRIPT_PORT_NAME = '@diff/portname/contentScript';
const CONTENT_SCRIPT_SOURCE_NAME = '@diff/content';
const BACKGROUND_SCRIPT_PORT_NAME = '@diff/background';
const MESSAGES_FRONTEND_SOURCE = '@diff/frontend';
const MESSAGES_BACKGROUND_SOURCE = '@diff/background';
var sources = {
  CONTENT_SCRIPT_PORT_NAME,
  CONTENT_SCRIPT_SOURCE_NAME,
  BACKGROUND_SCRIPT_PORT_NAME,
  MESSAGES_FRONTEND_SOURCE,
  MESSAGES_BACKGROUND_SOURCE
};

/**
 * Handles initializion that is required for our firebase application
 */

const initializeFirestore = () => {
  console.log("[plugin - firebase] initializing connection"); // connect to firebase

  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID
  };
  console.log(firebase);
  firebase.initializeApp(config);
  const firestore = firebase.firestore();
  const settings = {
    timestampsInSnapshots: true
  };
  firestore.settings(settings);
  return firestore;
};

var userFactory = (db => {
  const userRef = db.collection('users');

  const user$ = uid => Observable.create(observer => {
    if (uid == null || uid === undefined) {
      observer.error('uid cannot be null');
      observer.complete();
      return;
    }

    const unsubscribe = userRef.doc(uid).onSnapshot(doc => {
      const data = doc.data();
      observer.next(data);
    });
    return unsubscribe;
  });

  const getUser = uid => Observable.create(observer => {
    db.collection('users').doc(uid).get().then(doc => {
      if (!doc.exists) {
        observer.error('no user');
      } else {
        observer.next(doc.data());
      }
    }).catch(err => {
      observer.error(err.message);
    }).finally(() => {
      observer.complete();
    });
  });

  const setDefaultWorkspace$ = workspaceId => {
    debugger;
    const user = db.app.auth().currentUser;
    return from(db.collection('users').doc(user.uid).update({
      defaultWorkspaceId: workspaceId
    }));
  };

  return {
    user$,
    getUser,
    setDefaultWorkspace$
  };
});

const createForStorageType = type => ({
  get: async keys => new Promise(resolve => {
    chrome.storage[type].get(keys, resolve);
  }),
  set: async items => new Promise(resolve => {
    chrome.storage[type].set(items, resolve);
  })
});

const html5Storage = {
  local: {
    get: async keys => keys.reduce((acc, key) => _objectSpread({}, acc, {
      [key]: JSON.parse(localStorage.getItem(key))
    }), {}),
    set: async items => {
      Object.keys(items).forEach(key => {
        localStorage[key] = JSON.stringify(items[key]);
      });
      return null;
    }
  }
};
var storage = {
  local: createForStorageType('local'),
  sync: createForStorageType('sync'),
  html5: html5Storage
};

const normalizeUrl = require('normalize-url');

const location = () => {
  const url = normalizeUrl(window.location.href);
  return new URL(url);
};

var url = {
  location
};

const query = async options => new Promise((resolve, reject) => {
  chrome.tabs.query(options, tabs => tabs.length > 0 ? resolve(tabs[0]) : reject());
});

var tabs = {
  query
};

var runtime = {
  get id() {
    return chrome.runtime.id;
  }

};

const checkSession = async () => {
  const {
    id_token,
    access_token
  } = await storage.html5.local.get(['id_token', 'access_token']);

  if (!id_token || !access_token) {
    throw new Error('No token set');
  }

  const valid = jwtDecode(id_token).exp > Date.now() / 1000;
  return valid ? {
    id_token,
    access_token
  } : {
    id_token: null,
    access_token: null
  };
};

const getUserFromAccessToken = async () => {
  const {
    access_token: accessToken
  } = await storage.html5.local.get(['access_token']);

  if (!accessToken) {
    throw new Error('No access token set');
  }

  return jwtDecode(accessToken);
};

const authorize = async (webAuthInstance, state, nonce, redirectUri) => {
  // set browser auth0 authorize from our custom stsate,
  // not sure that this is even needed
  await storage.html5.local.set({
    'auth0-authorize': state
  }); // authorize with auth0

  webAuthInstance.authorize({
    connection: 'google-oauth2',
    redirectUri,
    scope: 'openid profile email offline_access',
    responseType: 'code',
    state,
    nonce,
    audience: 'https://api.getdiff.app/v1'
  });
  return Promise.resolve();
};

const renewSession = async () => {
  const {
    refresh_token: refreshToken
  } = await storage.html5.local.get(['refresh_token']);
  return fetch(`${process.env.API_SERVER}/auth/renew?refreshToken=${refreshToken}`);
};

var auth = {
  renewSession,
  authorize,
  checkSession,
  getUserFromAccessToken
};

var browser = {
  storage,
  url,
  tabs,
  runtime,
  auth
};

var commentsFactory = (db => {
  const eventsRef = db.collection('events');
  const commentsRef = eventsRef.where('type', '==', 'comment');

  const comments$ = (uid, workspaceId) => Observable.create(observer => {
    const subject = !_.isNil(workspaceId) ? 'meta.workspaceId' : 'meta.userId';
    const value = !_.isNil(workspaceId) ? workspaceId : uid;
    const location = browser.url.location();
    const unsubscribe = commentsRef.where('url.hostname', '==', location.hostname).where('url.pathname', '==', location.pathname).where(subject, '==', value).onSnapshot(querySnapshot => {
      if (!querySnapshot.empty) {
        querySnapshot.docChanges().forEach(({
          doc,
          type
        }) => {
          const data = doc.data();
          observer.next({
            data,
            type,
            id: doc.id
          });
        });
      }
    }, err => observer.err(err));
    return () => {
      console.log('Unsubuscribing from comments');
      unsubscribe();
    };
  });

  const uploadFile = async (file, uid) => {
    const storageRef = db.app.storage().ref(`attachments/${uid}/${file.name}`);
    const task = storageRef.put(file);
    return new Promise((resolve, reject) => {
      task.on('state_changed', snapshot => {// var percentage =
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log(percentage);
      }, error => {
        reject(error);
      }, () => {
        task.snapshot.ref.getDownloadURL().then(downloadURL => {
          resolve({
            url: downloadURL,
            name: file.name
          });
        });
      });
    });
  };
  /**
   * Creates a new comment for a given selector
   *
   *
   * @param {string} comment
   * @param {string} selector - id of our selector element
   * @param {[]<File>} uploadAttachment
   * @param {string} uid
   * @param {string|null} workspaceId
   */


  const addNewComment = async (comment, selector, uploadAttachment = [], uid, workspaceId) => {
    if (_.isNil(uid)) {
      throw new Error('UID cannot be undefined');
    }

    if (_.isNil(comment)) {
      throw new Error('comment cannot be undefined');
    }

    if (_.isNil(selector)) {
      throw new Error('selector cannot be undefined');
    }

    const attachments = await Promise.all(uploadAttachment.map(file => uploadFile(file, uid)));
    const location = browser.url.location();
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const record = {
      comment,
      selector,
      type: 'comment',
      meta: {
        userId: uid,
        created: timestamp
      },
      attachments,
      url: {
        hash: location.hash,
        hostname: location.hostname,
        href: location.href,
        origin: location.origin,
        pathname: location.pathname,
        port: location.port,
        protocol: location.protocol,
        search: location.search
      }
    };

    if (workspaceId) {
      record.meta.workspaceId = workspaceId;
    }

    const newEvent = eventsRef.doc();
    await newEvent.set(record);
    return newEvent.id;
  };

  return {
    comments$,
    uploadFile,
    addNewComment
  };
});

var workspaceFactory = (db => {
  const workspaceRef = db.collection('workspace');
  /**
   * Gets all of the available workspaces
   * for a given user id
   *
   * @param uid
   */

  const workspaces$ = uid => Observable.create(observer => {
    if (_.isNil(uid)) {
      observer.error('uid cannot be null');
      observer.complete();
      return;
    }

    const unsubscribe = workspaceRef.where(`users.${uid}.role`, '>', '').onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(({
        doc,
        type
      }) => {
        const data = doc.data();
        observer.next({
          data,
          type,
          id: doc.id
        });
      });
    }, err => {
      observer.error(err);
    });
    return unsubscribe;
  });
  /**
   * For a given workspace id returns a synchornized observer. This means
   * that we get live updates to that workspace
   *
   * @param workspaceId
   */


  const workspaceForId$ = workspaceId => Observable.create(observer => {
    if (_.isNil(workspaceId)) {
      observer.error('workspaceId cannot be null');
      observer.complete();
      return;
    }

    const unsubscribe = workspaceRef.doc(workspaceId).onSnapshot(doc => {
      if (doc.exists) {
        const queryResponse = {
          data: doc.data(),
          id: doc.id
        };
        observer.next(queryResponse);
      } else {
        observer.error('document does not exist');
      }
    }, err => {
      observer.error(err);
    });
    return unsubscribe;
  });
  /**
   * Gets our current id token (our current session id)
   */


  const getIdToken = async () => {
    const user = db.app.auth().currentUser;
    const idToken = user && (await user.getIdToken(true));

    if (_.isNil(idToken)) {
      throw new Error('User Token not retrievable. Is user logged in?');
    }

    return idToken;
  };
  /**
   * Invites a person to our workspace, this may be subject
   * to additional requirements according to your account
   *
   * @param email
   * @param firstName
   * @param lastName
   * @param workspaceId
   */


  const inviteCollaborator = async (email, firstName, lastName, workspaceId) => {
    if (_.isEmpty(email) || _.isNil(email)) {
      throw new Error('emails is required');
    }

    if (_.isNil(workspaceId)) {
      throw new Error('workspace id is required');
    }

    const idToken = await getIdToken();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      },
      body: JSON.stringify({
        email,
        firstName,
        lastName
      })
    };
    const response = await fetch(`${process.env.API_SERVER}/workspace/${workspaceId}/invite`, _objectSpread({}, options, {
      method: 'POST'
    }));

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    return response.json();
  };
  /**
   * Creates a new workspace
   *
   * @param name
   */


  const createWorkspace = async name => {
    if (_.isNil(name)) {
      throw new Error('Workspace name is required');
    }

    const idToken = await getIdToken();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      },
      body: JSON.stringify({
        name
      })
    };
    const response = await fetch(`${process.env.API_SERVER}/workspace`, _objectSpread({}, options, {
      method: 'POST'
    }));

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    return response.json();
  };

  return {
    workspaces$,
    workspaceForId$,
    inviteCollaborator,
    createWorkspace
  };
});

var authenticationFactory = (db => {
  const authenticate = async (username, password, refreshToken) => {
    const options = refreshToken ? {
      body: `refresh_token=${refreshToken}&grant_type=refresh_token`
    } : {
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`
      }
    };
    const response = await fetch(`${process.env.API_SERVER}/authenticate`, _objectSpread({}, options, {
      method: 'POST'
    }));

    if (!response.ok) {
      return Promise.reject('The username or password is incorrect');
    }

    return response.json();
  };

  const signup = async (email, password, displayName) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        displayName
      })
    };
    const response = await fetch(`${process.env.API_SERVER}/signup`, _objectSpread({}, options, {
      method: 'POST'
    }));

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    return response.json();
  };

  const isUser = async email => {
    const response = await fetch(`${process.env.API_SERVER}/validate?email=${email}`);

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    return response.text();
  };

  const tokenLogin = token => from(db.app.auth().signInWithCustomToken(token));

  const currentUser = () => {
    return db.app.auth().currentUser;
  };

  return {
    authenticate,
    signup,
    isUser,
    tokenLogin,
    currentUser
  };
});

var activityFactory = (db => {
  const activityRef = db.collection("activity");

  const userActivity$ = uid => {
    return Observable.create(observer => {
      const unsubscribe = activityRef.doc(uid).collection("seen").onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(({
          doc,
          type
        }) => {
          observer.next({
            data: doc.data(),
            type,
            id: doc.id
          });
        });
      }, err => observer.error(err));
      return unsubscribe;
    });
  };

  const createUserActivity$ = (uid, eventIds) => {
    const batch = db.batch(); // create a batch record for everything

    eventIds.forEach(docId => {
      const record = {
        [docId]: {
          id: docId,
          created: Date.now()
        }
      };
      const seenActivityRef = activityRef.doc(uid).collection("seen").doc(docId);
      batch.set(seenActivityRef, record);
    }); // batch everything

    return from(batch.commit());
  };

  return {
    userActivity$,
    createUserActivity$
  };
});

var inviteFactory = (db => {
  const invitesRef = db.collection('invites');

  const invitesForWorkspace$ = workspaceId => Observable.create(observer => {
    const unsubscribe = invitesRef.where('workspaceId', '==', workspaceId).onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(({
        doc,
        type
      }) => {
        const data = doc.data();
        observer.next({
          data,
          type,
          id: doc.id
        });
      });
    }, err => observer.err(err));
    return unsubscribe;
  });

  const inviteForEmail$ = email => Observable.create(observer => {
    const unsubscribe = invitesRef.where(`email`, '==', email).onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(({
        doc,
        type
      }) => {
        const data = doc.data();
        observer.next({
          data,
          type
        });
      });
    }, err => {
      observer.err(err);
    });
    return unsubscribe;
  });

  return {
    invitesForWorkspace$,
    inviteForEmail$
  };
});

var index = (() => {
  const db$ = initializeFirestore();
  const obs = {
    user: userFactory(db$),
    comments: commentsFactory(db$),
    workspace: workspaceFactory(db$),
    auth: authenticationFactory(db$),
    activity: activityFactory(db$),
    invites: inviteFactory(db$)
  };
  return obs;
});

const getDomains = async uid => {
  const response = await fetch(`${process.env.API_SERVER}/user/${uid}/domains`, {
    method: 'get'
  });

  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
};

var remoteSettings = {
  getDomains
};

class Authentication {
  constructor(domain, clientID) {
    _defineProperty(this, "checkAndRenewSession", async () => {
      try {
        // get an access token
        const {
          access_token,
          id_token
        } = await browser.auth.checkSession();

        if (access_token == null) {
          // attempt to renew the access token
          const response = await browser.auth.renewSession();
          const authResult = await response.json();
          browser.storage.html5.local.set(_objectSpread({}, authResult));

          if (chrome) {
            chrome.browserAction.setIcon({
              path: '../images/icon_128.png'
            });
          }

          return {
            access_token: authResult.access_token,
            id_token: authResult.id_token
          };
        }

        return {
          access_token,
          id_token
        };
      } catch (error) {
        // no token has been set at all
        console.error('[#checkAndRenewSession] - error checking session', error);

        if (chrome) {
          chrome.browserAction.setIcon({
            path: '../images/inactive_icon_128.png'
          });
        }

        throw new Error(`[#checkAndRenewSession] session is invalid${error}`);
      }
    });

    _defineProperty(this, "getUserProfile", async accessToken => new Promise((resolve, reject) => {
      this.auth.client.userInfo(accessToken, (err, user) => {
        if (err) {
          return reject(new Error(err));
        }

        return resolve(user);
      });
    }));

    _defineProperty(this, "logout", () => {
      this.auth.logout({});
    });

    this.auth = new auth0.WebAuth({
      domain,
      clientID,
      responseType: 'token',
      scope: 'openid profile email offline_access'
    });
  }
  /**
   * Chrome implementation of checking and renewing a session.
   * This method very purposefully manages the side effects of
   * setting the chrome browseraction icon in addition to checking the
   * session.
   *
   */


}

export { actions, types, sources, index as initApi, browser, remoteSettings, Authentication as AuthProvider };
//# sourceMappingURL=common.es.js.map
