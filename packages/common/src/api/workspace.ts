import { Observable, Observer } from 'rxjs';
import firebase from 'firebase';
import _ from 'lodash-es';

export interface QueryResponse {
  data: Object | firebase.firestore.DocumentData | undefined;
  type?: string | undefined;
  id: string;
}

export interface CreateWorkspaceResponse {
  workspaceId: string;
}

export default (db: firebase.firestore.Firestore): Object => {
  const workspaceRef = db.collection('workspace');

  /**
   * Gets all of the available workspaces
   * for a given user id
   *
   * @param uid
   */
  const workspaces$ = (uid: string): Observable<QueryResponse> =>
    Observable.create((observer: Observer<QueryResponse>) => {
      if (_.isNil(uid)) {
        observer.error('uid cannot be null');
        observer.complete();
        return;
      }

      const unsubscribe = workspaceRef
        .where(`users.${uid}.role`, '>', '')
        .onSnapshot(
          querySnapshot => {
            querySnapshot.docChanges().forEach(({ doc, type }) => {
              const data = doc.data();
              observer.next({ data, type, id: doc.id });
            });
          },
          err => {
            observer.error(err);
          }
        );

      return unsubscribe;
    });

  /**
   * For a given workspace id returns a synchornized observer. This means
   * that we get live updates to that workspace
   *
   * @param workspaceId
   */
  const workspaceForId$ = (workspaceId: string): Observable<QueryResponse> =>
    Observable.create((observer: Observer<QueryResponse>) => {
      if (_.isNil(workspaceId)) {
        observer.error('workspaceId cannot be null');
        observer.complete();
        return;
      }

      const unsubscribe = workspaceRef.doc(workspaceId).onSnapshot(
        doc => {
          if (doc.exists) {
            const queryResponse: QueryResponse = {
              data: doc.data(),
              id: doc.id
            };

            observer.next(queryResponse);
          } else {
            observer.error('document does not exist');
          }
        },
        err => {
          observer.error(err);
        }
      );

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
  const inviteCollaborator = async (
    email: string,
    firstName: string,
    lastName: string,
    workspaceId: string
  ): Promise<Object> => {
    debugger;
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

    const response = await fetch(
      `${process.env.API_SERVER}/workspace/${workspaceId}/invite`,
      {
        ...options,
        method: 'POST'
      }
    );

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
  const createWorkspace = async (
    name: string
  ): Promise<CreateWorkspaceResponse> => {
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

    const response = await fetch(`${process.env.API_SERVER}/workspace`, {
      ...options,
      method: 'POST'
    });

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
};
