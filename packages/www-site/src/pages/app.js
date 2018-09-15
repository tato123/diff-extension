import React from 'react'
import { Router } from '@reach/router'
import Layout from '../components/Layout'
import Details from '../components/Details'
import Home from '../components/Home'
import Login from '../components/Signup'
import PrivateRoute from '../components/PrivateRoute'

const App = () => (
  <Layout client>
    <Router>
      <PrivateRoute path="/app/profile" component={Home} />
      <PrivateRoute path="/app/details" component={Details} />
      <Login path="/app" />
    </Router>
  </Layout>
)

export default App
