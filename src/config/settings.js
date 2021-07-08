/*
  Global app settings
  Every process.env variable should be listed in this settings object
  
  General rule: no process.env references should be present in any other file!

  TODO: Add validation for critical env variables
*/
export default {
  isDevelopment: process.env.NODE_ENV !== 'production',
  isProduction: process.env.NODE_ENV === 'production',
  isStaging: process.env.REACT_APP_IS_STAGING ? JSON.parse(process.env.REACT_APP_IS_STAGING) : false,
  debug: process.env.REACT_APP_DEBUG ? JSON.parse(process.env.REACT_APP_DEBUG) : false,
  graphqlServerUrl: process.env.REACT_APP_GRAPHQL_SERVER_URL,
};
