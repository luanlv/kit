/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';

const title = 'Dashboard';

export default {

  path: '/',

  async action({query}) {
    const {App, Dashboard } = await require('../AdminRequire')
    return {
      title,
      chunk: 'admin',
      disableSSR: true,
      component: <App
        name={title}
      >
        <Dashboard title={title} />
      </App>,
    };
  },
};
