import React from 'react';
import { initApi } from '@diff/common';

import { zip } from 'rxjs';
import { mergeMap, map, first } from 'rxjs/operators';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.connect();
  }

  state = {
    user: null
  };

  componentDidMount() {
    if (!this.api) {
      return;
    }

    this.api.user
      .getCurrentUser$()
      .pipe(
        mergeMap(user => {
          const observables = Object.keys(user.workspaces).map(workspaceId =>
            this.api.workspace.workspaceForId$(workspaceId).pipe(first())
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

  connect() {
    try {
      this.api = initApi();
    } catch (error) {
      console.warn(error.message);
    }
  }

  render() {
    const {
      state: { user },
      props: { children }
    } = this;

    return children(user);
  }
}
