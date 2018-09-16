import React from 'react'
import { Router } from '@reach/router'
import Layout from '../components/Layout'

import Login from '../components/Signup'

const App = () => (
  <Layout client>
    <Router>
      <Login path="/app" />
    </Router>
  </Layout>
)

export default App
