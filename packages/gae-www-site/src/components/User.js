import React from 'react';
import { initApi } from '@diff/common';

import { zip } from 'rxjs';
import { mergeMap, map, tap, first } from 'rxjs/operators';

const api = initApi();

export default class User extends React.Component {
  state = {
    user: null
  };

  componentDidMount() {
    api.user
      .getCurrentUser$()
      .pipe(
        mergeMap(user => {
          const observables = Object.keys(user.workspaces).map(workspaceId =>
            api.workspace.workspaceForId$(workspaceId).pipe(first())
          );

          return zip(...observables).pipe(
            map(vals => {
              vals.forEach(
                workspace => (user.workspaces[workspace.id] = workspace.data)
              );

              return user;
            })
          );
        })
      )
      .subscribe(
        val => {
          this.setState({ user: val });
        },
        err => {
          console.error(err);
        }
      );
  }

  render() {
    const {
      state: { user },
      props: { children }
    } = this;

    return children(user);
  }
}
