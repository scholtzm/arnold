import Dispatcher from '../dispatcher';
import Constants from '../constants';

export function setSettings(settings) {
  Dispatcher.dispatch({
    type: Constants.SettingsActions.SET_SETTINGS,
    settings
  });
}
