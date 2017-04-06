/* eslint-disable import/prefer-default-export */

import { SET_SETTING } from '../constants';

export function setSetting({ value }) {
  return {
    type: SET_SETTING,
    payload: {
      value
    },
  };
}
