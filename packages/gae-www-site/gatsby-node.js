/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const Dotenv = require('dotenv-webpack');

// You can delete this file if you're not using it
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = `/app/*`;

    // Update the page.
    createPage(page);
  }
};

exports.onCreateWebpackConfig = ({
  stage,
  getConfig,
  rules,
  loaders,
  actions
}) => {
  actions.setWebpackConfig({
    plugins: [
      new Dotenv({
        path: `../../.env.${process.env.NODE_ENV}`
      })
    ]
  });
};
