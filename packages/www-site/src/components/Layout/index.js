import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from '../Header'

import { ThemeProvider, Themes } from '@diff/shared-components'

import './bootstrap.min.css'
import './base.css'

const Layout = ({ children, client, extensionUrl }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <meta charset="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <title>Diff</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="favicon.png" rel="icon" type="image/x-icon" />
          <link rel="chrome-webstore-item" href={extensionUrl} />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
            rel="stylesheet"
          />
          <html lang="en" />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} client={client} />
        <ThemeProvider theme={Themes.public}>{children}</ThemeProvider>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
  extensionUrl: process.env.EXTENSION_URL,
}

export default Layout
