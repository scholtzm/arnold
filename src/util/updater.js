import React from 'react';
import request from 'superagent';
import debug from 'debug';
import semver from 'semver';
import { Button } from 'stardust';
import { Link } from 'react-router';

import packageJson from '../../package.json';
import { addNotification } from '../actions/notification-actions.js';

const UPDATE_URL = 'https://api.github.com/repos/scholtzm/arnold/releases';
const RELEASE_PAGE = 'https://github.com/scholtzm/arnold/releases';
const logger = debug('util:updater');

export function checkUpdate(notifyOnAllActions = false) {
  request
    .get(UPDATE_URL)
    .end((err, res) => {
      logger(err, res);

      if(err) {
        logger(err, res);

        if(notifyOnAllActions) {
          addNotification({
            title: 'Failed to check for updates',
            message: `${res.status} ${res.statusText}`,
            level: 'error'
          });
        }

        return;
      }

      if(res.body.length === 0) {
        return;
      }

      const latestVersion = semver.clean(res.body[0].tag_name);

      if(semver.lt(packageJson.version, latestVersion)) {
        addNotification({
          title: 'Update available',
          message: 'New Arnold update is available!',
          level: 'success',
          autoDismiss: 0,
          children: (
            <Button as={Link} href={RELEASE_PAGE} target='_blank' color='green' content='Download' style={{marginTop: '5px'}} />
          )
        });
      }

      if(notifyOnAllActions) {
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
