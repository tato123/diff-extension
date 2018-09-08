import { Observable } from "rxjs";

export default db => {
  const workspaceRef = db.collection("workspace");

  const workspaces$ = uid => {
    return Observable.create(observer => {
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
            observer.err(err);
          }
        );

      return unsubscribe;
    });
  };

  const workspaceForId$ = workspaceId => {
    return Observable.create(observer => {
      const unsubscribe = workspaceRef.doc(workspaceId).onSnapshot(
        doc => {
          if (doc.exists) {
            observer.next({ data: doc.data(), type: null, id: doc.id });
          } else {
            observer.error("document does not exist");
          }
        },
        err => {
          observer.err(err);
        }
      );

      return unsubscribe;
    });
  };

  const addCollaborators = async (emails, workspaceId, accessToken) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
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

  const addSingleCollaborator = async (email, workspaceId) =>
    addCollaborators([email], workspaceId);

  const createWorkspace = async (name, accessToken) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
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
