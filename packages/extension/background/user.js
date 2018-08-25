import { getDb } from "./datastore";

import jwtDecode from "jwt-decode";
import _ from "lodash";
import { firebase } from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";

let cachedToken = null;
let unsubscribeList = [];
let remoteDomains = [];

export const invalidateToken = () => {
  console.log("invaliding token");
  cachedToken = null;

  // clearing reducer
  unsubscribeList = unsubscribeList.reduce((acc, unsubscribeFn) => {
    unsubscribeFn();
    // return empty list
    return acc;
  }, []);
};

const authenticate = async refreshToken => {
  const options = {
    body: `refresh_token=${refreshToken}&grant_type=refresh_token`
  };

  const response = await fetch(`${process.env.API_SERVER}/authenticate`, {
    ...options,
    method: "POST"
  });

  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
};

export const login = async (refreshToken, invalidate = false) => {
  try {
    if (invalidate) {
      invalidateToken();
    }

    if (cachedToken) {
      return cachedToken;
    }

    const token = await authenticate(refreshToken);
    await firebase.auth().signInWithCustomToken(token.access_token);
    const jwt = jwtDecode(token.access_token);

    // post login actions
    cachedToken = jwt;
    syncRemoteDomains();

    return jwt;
  } catch (err) {
    console.error(err);
  }
};

export const syncRemoteDomains = async () => {
  // get the remote domains
  const userUnsubscribe = getDb()
    .collection("events")
    .where("meta.userId", "==", cachedToken.uid)
    .onSnapshot(
      snapshot => {
        snapshot.docChanges().forEach(change => {
          const data = change.doc.data();
          if (change.type === "added") {
            remoteDomains = _.union(remoteDomains, [data.url.href]);
          }
          if (change.type === "modified") {
            // modified
          }
          if (change.type === "removed") {
            // remove
          }
        });
      },
      function(error) {
        console.error(error);
      }
    );
  unsubscribeList.push(userUnsubscribe);

  // get any workspaces they belong to
  const workspaceSnapshot = await getDb()
    .collection("workspace")
    .where(`users.${cachedToken.uid}.role`, ">", "")
    .get();

  workspaceSnapshot.forEach(doc => {
    const id = doc.id;

    const unsubscriber = getDb()
      .collection("events")
      .where("meta.workspaceId", "==", id)
      .onSnapshot(
        snapshot => {
          snapshot.docChanges().forEach(change => {
            const data = change.doc.data();
            if (change.type === "added") {
              remoteDomains = _.union(remoteDomains, [data.url.href]);
            }
          });
        },
        function(error) {
          console.error(error);
        }
      );
    unsubscribeList.push(unsubscriber);
  });
};

export const getRemoteDomains = async () => {
  return remoteDomains;
};
