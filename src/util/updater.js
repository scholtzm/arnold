import request from 'superagent';
import debug from 'debug';
import semver from 'semver';

import packageJson from '../../package.json';
import { addNotification } from '../actions/notification-actions.js';

const UPDATE_URL = 'https://api.github.com/repos/scholtzm/arnold/releases';
const RELEASE_PAGE = 'https://github.com/scholtzm/arnold/releases';
const logger = debug('util:updater');

export function checkUpdate(notifyIfNoUpdate = false) {
  request
    .get(UPDATE_URL)
    .end((err, res) => {
      logger(err, res);

      if(err) {
        logger(err, res);
        return;
      }

      if(res.body.length === 0) {
        return;
      }

      const latestRelease = res.body[0];
      const latestVersion = semver.clean(latestRelease.tag_name);

      if(semver.lt(packageJson.version, latestVersion)) {
        addNotification({
          title: 'Update available',
          message: 'New Arnold update is available!',
          level: 'success',
          autoDismiss: 0,
          action: {
            label: 'Download',
            callback: function() {
              logger('Opening download page.');
              window.open(RELEASE_PAGE, '_blank');
            }
          }
        });
      }

      if(notifyIfNoUpdate) {
        if(semver.eq(packageJson.version, latestVersion)) {
          addNotification({
            title: 'All good!',
            message: 'You are running the latest version.',
            level: 'info'
          });
        }
      }
    });
}
