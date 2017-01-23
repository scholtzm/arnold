import React from 'react';
import semver from 'semver';
import { Button } from 'semantic-ui-react';

import debug from '../util/debug.js';
import { addNotification } from '../actions/notification-actions.js';
import pkg from '../../package.json';

const logger = debug('util:updater');

export function checkUpdate(notifyOnAllActions = false) {
  fetch(pkg.repository.updateUrl)
    .then(response => {
      if(response.status !== 200) {
        const err = new Error('Invalid response');
        err.response = response;

        throw err;
      }

      return response.json();
    })
    .then(json => {
      logger('success', json);

      if(json.length === 0) {
        return;
      }

      const latestVersion = semver.clean(json[0].tag_name);

      if(semver.lt(pkg.version, latestVersion)) {
        addNotification({
          title: 'Update available',
          message: 'New Arnold update is available!',
          level: 'success',
          autoDismiss: 0,
          children: (
            <Button as='a' href={json[0].html_url} target='_blank' color='green' content='Download' style={{marginTop: '5px'}} />
          )
        });

        return;
      }

      if(notifyOnAllActions) {
        addNotification({
          title: 'All good!',
          message: 'You are running the latest version.',
          level: 'info'
        });
      }

    })
    .catch(err => {
      logger('error', err);

      let message = err.message;
      if(err.response) {
        message = `${err.response.status} ${err.response.statusText}`
      }

      if(notifyOnAllActions) {
        addNotification({
          title: 'Failed to check for updates',
          message,
          level: 'error'
        });
      }
    });
}
