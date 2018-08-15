import firebase from "firebase";

const addCollaborators = async (emails, workspaceId) => {
  /* eslint-disable */
  debugger;

  const idToken = await firebase.auth().currentUser.getIdToken(true);
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
  debugger;
  const response = await fetch(`${process.env.API_SERVER}/invite`, {
    ...options,
    method: "POST"
  });

  if (!response.ok) {
    debugger;
    return Promise.reject(response.statusText);
  }

  return response.json();
};

const addSingleCollaborator = async (email, workspaceId) =>
  addCollaborators([email], workspaceId);

export default {
  addCollaborators,
  addSingleCollaborator
};
