import { camelCase } from 'lodash';
import { request } from './';

const methods = [
  'Back',
  'ContextMenu',
  'Down',
  'ExecuteAction',
  'Home',
  'Info',
  'Left',
  'Right',
  'Select',
  'SendText',
  'ShowCodec',
  'ShowOSD',
  'Up'
];

let input = {};
methods.forEach(method => {
  input[camelCase(method)] = (callback) => request(`Input.${method}`, {}, callback);
});

export default input;
