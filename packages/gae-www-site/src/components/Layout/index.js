import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import HeaderImpl from '../Header';

import './bootstrap.min.css';
import './base.css';

import Favicon from './favicon.png';

export default class Layout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    extensionUrl: PropTypes.string,
    client: PropTypes.any,
    Header: PropTypes.node,
    rightMenuItem: PropTypes.func
  };

  static defaultProps = {
    extensionUrl: process.env.EXTENSION_URL,
    client: null,
    rightMenuItem: null,
    Header: HeaderImpl
  };

  render() {
    const {
      props: { children, extensionUrl, client, Header, rightMenuItem }
    } = this;

    return (
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
          <React.Fragment>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                { name: 'description', content: 'Sample' },
                { name: 'keywords', content: 'sample, something' }
              ]}
            >
              <meta charset="utf-8" />
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <meta
                name="google-site-verification"
                content="DzPw6I7ZrHul0u7TDgjgwRqwZh4HdEagNQbiySiBBXo"
              />

              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <link href={Favicon} rel="icon" type="image/x-icon" />
              <link rel="chrome-webstore-item" href={extensionUrl} />
              <link
                href="https://fonts.googleapis.com/css?family=Heebo:100,300,400,500,700,900"
                rel="stylesheet"
              />
              <html lang="en" />
            </Helmet>
            <Header
              siteTitle={data.site.siteMetadata.title}
              rightMenuItem={rightMenuItem}
            />
            {children}
          </React.Fragment>
        )}
      />
    );
  }
}
