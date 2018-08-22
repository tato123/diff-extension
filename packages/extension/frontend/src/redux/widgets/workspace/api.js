import firebase from "firebase";

const addCollaborators = async (emails, workspaceId) => {
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

const createWorkspace = async name => {
  const idToken = await firebase.auth().currentUser.getIdToken(true);
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

export default {
  addCollaborators,
  addSingleCollaborator,
  createWorkspace
};
