/* eslint-disable no-console */
/* eslint-disable no-param-reassign */

/* 
  This file is triggered by `npm run graphql:dump` command
  It fetches the graphql schema to identify the fragment types and writes them into fragment-types.json
*/
const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const fetch = require('node-fetch');

fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then((result) => result.json())
  .then((result) => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter((type) => type.possibleTypes !== null);
    result.data.__schema.types = filteredData;
    fs.writeFileSync('./src/graphql/fragment-types.json', JSON.stringify(result.data), (err) => {
      if (err) {
        console.error('Error writing fragmentTypes file', err);
      } else {
        console.log('Fragment types successfully extracted!');
      }
    });
  });
