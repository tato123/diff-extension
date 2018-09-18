import React from 'react'
import { Router } from '@reach/router'
import Layout from '../components/Layout'

import Signup from '../components/Signup'
import Account from '../components/Account'

const App = () => (
  <Layout client>
    <Router>
      <Signup path="/app/signup" />
      <Account path="/app/account" />
    </Router>
  </Layout>
)

export default App
