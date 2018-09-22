import { Observable, Observer } from "rxjs";
import * as firebase from "firebase";
import _ from "lodash";

export interface QueryResponse {
  data: Object | firebase.firestore.DocumentData | undefined;
  type?: string | undefined;
  id: string;
}

export interface CreateWorkspaceResponse {
  workspaceId: string;
}

export default (db: firebase.firestore.Firestore): Object => {
  const workspaceRef = db.collection("workspace");

  const workspaces$ = (uid: string): Observable<QueryResponse> => {
    return Observable.create((observer: Observer<QueryResponse>) => {
      if (_.isNil(uid)) {
        observer.error("uid cannot be null");
        observer.complete();
        return;
      }

      const unsubscribe = workspaceRef
        .where(`users.${uid}.role`, ">", "")
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
  };

  const workspaceForId$ = (workspaceId: string): Observable<QueryResponse> => {
    return Observable.create((observer: Observer<QueryResponse>) => {
      if (_.isNil(workspaceId)) {
        observer.error("workspaceId cannot be null");
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
            observer.error("document does not exist");
          }
        },
        err => {
          observer.error(err);
        }
      );

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

  const addCollaborators = async (
    emails: Array<string>,
    workspaceId: string
  ): Promise<Object> => {
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

    const response = await fetch(`${process.env.API_SERVER}/invite`, {
      ...options,
      method: "POST"
    });

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    return response.json();
  };

  const addSingleCollaborator = async (
    email: string,
    workspaceId: string
  ): Promise<Object> => addCollaborators([email], workspaceId);

  const createWorkspace = async (
    name: string
  ): Promise<CreateWorkspaceResponse> => {
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

    const response = await fetch(`${process.env.API_SERVER}/workspace`, {
      ...options,
      method: "POST"
    });

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
};
