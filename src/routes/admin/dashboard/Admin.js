/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import UniversalRouter from 'universal-router'
import history from '../../../core/history'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button, DatePicker} from 'antd';
class Admin extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
        <div>
          <h1>{this.props.title}</h1>
          <a href="/auth/facebook"><Button type="primary">Button</Button></a>
          <Button type="primary"
            onClick={() => {
              history.push({
                pathname: '/admin/library',
                search: event.currentTarget.search
              })
            }}
          >Redirect</Button>
        </div>
    );
  }
}

export default Admin
