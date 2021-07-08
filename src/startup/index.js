// import * as Sentry from '@sentry/react';
// import settings from 'config/settings';
// import initGA from './init-ga';
import runFixtures from './fixtures';

export default function startup() {
  runFixtures();
  // if (settings.isProduction) Sentry.init({ dsn: settings.sentryDsn });
}
