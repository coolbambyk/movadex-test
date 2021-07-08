/*
  In most cases you need routePaths default export
  But if the route includes a variable, you may need to interpolate this value into template. To do this, you can import routePatterns

  Usage:

  import { routePatterns } from 'router/route-paths';
  const path = routePatterns.userProfile.stringify({ id: params.id }))

  Where "userProfile" is a key in routePaths with a variable like this { userProfile: '/user/:id' }
*/
import UrlPattern from 'url-pattern';

const routePaths = {
  home: '/',
  category: '/category/:categoryId',
};

export const routePatterns = Object.entries(routePaths).reduce(
  (p, [key, pattern]) => ({ ...p, [key]: new UrlPattern(pattern) }),
  {},
);

export default routePaths;
