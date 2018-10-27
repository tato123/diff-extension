import React from 'react';
import { Switch, Route } from 'react-router';

import CreateWorkspace from './CreateWorkspace';
import ListWorkspaces from './ListWorkspaces';
import ListCollaborators from './ListCollaborators';
import AddCollaborator from './AddCollaborator';

const Placeholder = ({ text }) => (
  <h1>
    Placeholder
    {text}
  </h1>
);

const Finder = () => <Placeholder text="finder" />;

const Annotations = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/workspace/create" component={CreateWorkspace} />
      <Route exact path="/workspace/find" component={Finder} />
      <Route exact path="/workspace/:id" component={ListCollaborators} />
      <Route
        exact
        path="/workspace/:id/addCollaborator"
        component={AddCollaborator}
      />

      <Route exact path="/workspace" component={ListWorkspaces} />
    </Switch>
  </React.Fragment>
);

export default Annotations;
