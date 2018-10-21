import _ from 'lodash';
import firestoreClient from './client';

const { admin, db } = firestoreClient;

const firebaseTokenToUid = async (token: string): Promise<string | null> =>
  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken: { uid: string }) => decodedToken.uid);

/**
 * Converts a bearer aute
 * @param authorizationBearer
 */
const bearerToUid = async (
  authorizationBearer: string
): Promise<string | null> => {
  if (
    !_.isNil(authorizationBearer) &&
    authorizationBearer.toLowerCase().startsWith('bearer')
  ) {
    const idToken = authorizationBearer.split(' ')[1];
    return firebaseTokenToUid(idToken);
  }

  return null;
};

export default {
  bearerToUid
};
