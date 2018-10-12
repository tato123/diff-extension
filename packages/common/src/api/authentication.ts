import 'firebase/auth';
import { from } from 'rxjs';

export interface AuthenticationResponse {
  refresh_token: string;
  access_token: string;
}

export default (db: any) => {
  const authenticate = async (
    username: string,
    password: string,
    refreshToken?: string
  ): Promise<AuthenticationResponse> => {
    const options = refreshToken
      ? {
          body: `refresh_token=${refreshToken}&grant_type=refresh_token`
        }
      : {
          headers: {
            Authorization: `Basic ${btoa(`${username}:${password}`)}`
          }
        };

    const response = await fetch(`${process.env.API_SERVER}/authenticate`, {
      ...options,
      method: 'POST'
    });

    if (!response.ok) {
      return Promise.reject('The username or password is incorrect');
    }

    return response.json();
  };

  const signup = async (
    email: string,
    password: string,
    displayName: string
  ): Promise<any> => {
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
  };

  const isUser = async (email: string): Promise<string> => {
    const response = await fetch(
      `${process.env.API_SERVER}/validate?email=${email}`
    );

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    return response.text();
  };

  const tokenLogin = (token: string): Observable<any> =>
    from(db.app.auth().signInWithCustomToken(token));

  return {
    authenticate,
    signup,
    isUser,
    tokenLogin
  };
};
