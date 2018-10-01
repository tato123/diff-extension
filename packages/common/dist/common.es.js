import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Observable, from } from 'rxjs';
import _ from 'lodash-es';
import 'firebase/storage';

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
  FEATURE_FLAGS_UPDATE: 'featureFlagUpdate'
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

  return {
    user$,
    getUser
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
      [key]: JSON.parse(localStorage.getItem('firebaseToken'))
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

var browser = {
  storage,
  url,
  tabs,
  runtime
};

var commentsFactory = (db => {
  const eventsRef = db.collection('events');
  const commentsRef = eventsRef.where('type', '==', 'comment');

  const comments$ = (uid, workspaceId) => {
    return Observable.create(observer => {
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
  };

  const uploadFile = async (file, uid) => {
    const storageRef = db.app.storage().ref(`attachments/${uid}/${file.name}`);
    const task = storageRef.put(file);
    return new Promise((resolve, reject) => {
      task.on('state_changed', function progress(snapshot) {// var percentage =
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log(percentage);
      }, function error(error) {
        reject(error);
      }, function complete() {
        task.snapshot.ref.getDownloadURL().then(downloadURL => {
          resolve({
            url: downloadURL,
            name: file.name
          });
        });
      });
    });
  };

  const addNewComment = async (comment, selector, uploadAttachment, uid, workspaceId) => {
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
    const record = {
      comment,
      selector,
      type: 'comment',
      meta: {
        userId: uid,
        created: Date.now()
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
  const workspaceRef = db.collection("workspace");

  const workspaces$ = uid => {
    return Observable.create(observer => {
      if (_.isNil(uid)) {
        observer.error("uid cannot be null");
        observer.complete();
        return;
      }

      const unsubscribe = workspaceRef.where(`users.${uid}.role`, ">", "").onSnapshot(querySnapshot => {
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
  };

  const workspaceForId$ = workspaceId => {
    return Observable.create(observer => {
      if (_.isNil(workspaceId)) {
        observer.error("workspaceId cannot be null");
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
          observer.error("document does not exist");
        }
      }, err => {
        observer.error(err);
      });
      return unsubscribe;
    });
  };

  const getIdToken = async () => {
    const user = db.app.auth().currentUser;
    const idToken = user && (await user.getIdToken(true));

    if (_.isNil(idToken)) {
      throw new Error("User Token not retrievable. Is user logged in?");
    }

    return idToken;
  };

  const addCollaborators = async (emails, workspaceId) => {
    if (_.isEmpty(emails) || _.isNil(emails)) {
      throw new Error("emails is required");
    }

    if (_.isNil(workspaceId)) {
      throw new Error("workspace id is required");
    }

    const idToken = await getIdToken();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`
      },
      body: JSON.stringify({
        emails,
        workspaceId
      })
    };
    const response = await fetch(`${process.env.API_SERVER}/invite`, _objectSpread({}, options, {
      method: "POST"
    }));

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    return response.json();
  };

  const addSingleCollaborator = async (email, workspaceId) => addCollaborators([email], workspaceId);

  const createWorkspace = async name => {
    if (_.isNil(name)) {
      throw new Error("Workspace name is required");
    }

    const idToken = await getIdToken();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`
      },
      body: JSON.stringify({
        name
      })
    };
    const response = await fetch(`${process.env.API_SERVER}/workspace`, _objectSpread({}, options, {
      method: "POST"
    }));

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    return response.json();
  };

  return {
    workspaces$,
    workspaceForId$,
    addCollaborators,
    addSingleCollaborator,
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

  const login = async (username, password, refreshToken) => {
    const token = await authenticate(username, password, refreshToken); // login to firebase

    const results = await db.app.auth().signInWithCustomToken(token.access_token);
    return token;
  };

  const tokenLogin = token => db.app.auth().signInWithCustomToken(token);

  return {
    login,
    authenticate,
    signup,
    isUser,
    tokenLogin
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

  const invitesForWorkspace$ = workspaceId => {
    return Observable.create(observer => {
      const unsubscribe = invitesRef.where('workspaceId', '==', workspaceId).where('status', '==', 'pending').onSnapshot(querySnapshot => {
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
  };

  const inviteForEmail$ = email => {
    return Observable.create(observer => {
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
  };

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

const getDomains = async token => {
  const response = await fetch(`${process.env.API_SERVER}/tokens/${token}/domains`, {
    method: 'get'
  });

  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
};

export { actions, types, sources, index as initApi, browser, getDomains };
//# sourceMappingURL=common.es.js.map
