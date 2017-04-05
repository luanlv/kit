/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import Contact from './Contact';
import fetch from '../../core/fetch';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
const title = 'Contact Us';

export default {

  path: '/contact',

  async action({store}) {
    store.dispatch(showLoading())
    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{news{title,link,content}users{id}}',
      }),
      credentials: 'include',
    });
    const data = await resp.json();
    store.dispatch(hideLoading())
    console.log(data)
    return {
      title,
      component: <Layout><Contact title={title} /></Layout>,
    };
  },

};
