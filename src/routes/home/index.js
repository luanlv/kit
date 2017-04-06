/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import fetch from '../../core/fetch';
import needFetch from '../../core/needFetch';
import Layout from '../../components/Layout';
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export default {

  path: '/',

  async action({store}) {
    // process.env.BROWSER
    var news;
    if(!process.env.BROWSER || !store.getState().setting.ssr || (process.env.BROWSER && needFetch())){
      const resp = await fetch('/graphql', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: '{news{title,link,content}}',
        }),
        credentials: 'include',
      });

      const { data } = await resp.json();
      if (!data || !data.news) throw new Error('Failed to load the news feed.');
      news = data.news
    } else {
      news = []
    }
    return {
      title: 'React Starter Kit',
      component: <Layout><Home news={news} /></Layout>,
    };
  },

};
