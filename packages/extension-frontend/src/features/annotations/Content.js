import React from 'react';
import { Switch, Route } from 'react-router';

import Target from './components/Target';
import Comments from './components/Comments';

const Annotations = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/annotations/:id" component={Comments} />
      <Route exact path="/annotations" component={Target} />
    </Switch>
  </React.Fragment>
);

export default Annotations;
