require('dotenv').config({
  path: `../../.env.${process.env.NODE_ENV}`
});

if (process.env.IS_PRESENT !== 'yes') {
  console.log('loaded incorrectly');
  process.exit(1);
}

module.exports = {
  siteMetadata: {
    title: 'Diff',
    siteUrl: 'https://www.getdiff.app'
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui'
      }
    },

    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-124426207-2',
        // Puts tracking script in the head instead of the body
        head: false,
        // required for gdpr compliance without banner
        anonymize: true
      }
    }
  ]
};
