import { initApi } from '@diff/common';
import 'firebase/firestore';
import 'firebase/auth';

export default class FirestoreApi {
  db = null;

  accessToken = null;

  refreshToken = null;

  constructor(db) {
    this.db = db;
  }

  static connect() {
    const firestoreApi = initApi();
    return new FirestoreApi(firestoreApi);
  }

  get currentPage() {
    if (typeof window !== 'undefined') {
      return window.location;
    }
    return { location: {} };
  }

  get currentUid() {
    return this.db.app.auth().currentUser && this.db.app.auth().currentUser.uid;
  }

  onCommentAddedToCurrentPage(listenerFn) {
    const userId = this.currentUid;

    return this.db
      .collection('events')
      .where('type', '==', 'comment')
      .where('meta.userId', '==', userId)
      .onSnapshot(
        querySnapshot => {
          if (!querySnapshot.empty) {
            querySnapshot.docChanges().forEach(({ doc, type }) => {
              if (type === 'added') {
                listenerFn(doc.data());
              }
            });
          }
        },
        err => listenerFn(null, err)
      );
  }

  onAuthStateChanged(cb) {
    this.db.app.auth().onAuthStateChanged(cb);
  }

  async getCurrentUser() {
    return new Promise((resolve, reject) => {
      this.onAuthStateChanged(async user => {
        if (user) {
          const userDoc = await this.db
            .collection('users')
            .doc(user.uid)
            .get();
          return resolve(userDoc.data());
        }

        resolve(null);
      });
    });
  }

  async getRefreshToken() {
    const uid = this.currentUid;
    if (uid == null) {
      return null;
    }

    const tokenRef = await this.db
      .collection('refreshToken')
      .doc(uid)
      .get();
    return tokenRef.data().token;
  }

  async login(accessToken, refreshToken) {
    await this.db.app.auth().setPersistence('session');

    const results = this.db.app.auth().signInWithCustomToken(accessToken);
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
    return results;
  }

  async isUser(email) {
    const response = await fetch(
      `${process.env.API_SERVER}/validate?email=${email}`
    );

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    return response.text();
  }

  async signup(email, password, displayName) {
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

    const response = await fetch(`${process.env.API_SERVER}/signup`, {
      ...options,
      method: 'POST'
    });

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    return response.json();
  }

  async updateUser(key, value) {
    return this.db
      .collection('users')
      .doc(this.currentUid)
      .update({ [key]: value })
      .then(() => {
        console.log('completed succesfully', key, value);
      })
      .catch(error => {
        console.error(error);
      });
  }
}
