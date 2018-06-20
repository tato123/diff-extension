module.exports = function(source, map) {
  const style = `
        <style>
            ${source}
        </style>
    `;

  this.callback(
    null,
    `export default function (Component) {
        
        
          Component.options.__styles = ${JSON.stringify(style)};
          Component.options.components = Object.assign({}, Component.options.components, {
              shadowStyle: {
                  template:'<span v-html="style"></span>',
                  data() {
                      return {
                          style: ${JSON.stringify(style)}
                      }
                  } 
              }
          });
          console.log(Component);
      }`,
    map
  );
};
