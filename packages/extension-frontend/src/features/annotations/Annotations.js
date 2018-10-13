import React from 'react';
import { Switch, Route } from 'react-router';
import List from './components/List';

const Placeholder = ({ match }) => (
  <div>
    Hello
    {match.params.id}
  </div>
);

const Annotations = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/annotations/:id" component={Placeholder} />
      <Route exact path="/annotations" component={List} />
    </Switch>
  </React.Fragment>
);

export default Annotations;
