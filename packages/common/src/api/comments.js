import { Observable } from 'rxjs';
import _ from 'lodash-es';
import 'firebase/storage';
import firebase from 'firebase/app';
import browser from '../browser';

export default db => {
  const eventsRef = db.collection('events');
  const commentsRef = eventsRef.where('type', '==', 'comment');

  const comments$ = (uid, workspaceId) =>
    Observable.create(observer => {
      const subject = !_.isNil(workspaceId)
        ? 'meta.workspaceId'
        : 'meta.userId';
      const value = !_.isNil(workspaceId) ? workspaceId : uid;
      const location = browser.url.location();

      const unsubscribe = commentsRef
        .where('url.hostname', '==', location.hostname)
        .where('url.pathname', '==', location.pathname)
        .where(subject, '==', value)
        .onSnapshot(
          querySnapshot => {
            if (!querySnapshot.empty) {
              querySnapshot.docChanges().forEach(({ doc, type }) => {
                const data = doc.data();
                observer.next({ data, type, id: doc.id });
              });
            }
          },
          err => observer.err(err)
        );

      return () => {
        console.log('Unsubuscribing from comments');
        unsubscribe();
      };
    });

  const uploadFile = async (file, uid) => {
    const storageRef = db.app.storage().ref(`attachments/${uid}/${file.name}`);
    const task = storageRef.put(file);

    return new Promise((resolve, reject) => {
      task.on(
        'state_changed',
        snapshot => {
          // var percentage =
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log(percentage);
        },
        error => {
          reject(error);
        },
        () => {
          task.snapshot.ref.getDownloadURL().then(downloadURL => {
            resolve({ url: downloadURL, name: file.name });
          });
        }
      );
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
  const addNewComment = async (
    comment,
    selector,
    uploadAttachment = [],
    uid,
    workspaceId
  ) => {
    if (_.isNil(uid)) {
      throw new Error('UID cannot be undefined');
    }

    if (_.isNil(comment)) {
      throw new Error('comment cannot be undefined');
    }

    if (_.isNil(selector)) {
      throw new Error('selector cannot be undefined');
    }

    const attachments = await Promise.all(
      uploadAttachment.map(file => uploadFile(file, uid))
    );

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
};
