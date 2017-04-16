/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button, DatePicker, Switch, Row, Col, message} from 'antd';
import fetch from '../../../core/fetch';


class Setting extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props){
    super(props)
    this.state = {
      setting: {}
    }
    this.init()
  }

  async init () {
    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{ setting{ssr} }',
      }),
      credentials: 'include',
    })
    const {data} = await resp.json();
    this.setState({
      setting: data.setting
    })
  }

  async toggleSSR () {
    this.setState((prevState) => {
      return {
        ...prevState,
        setting: {
          ...prevState.setting,
          ssr: !prevState.setting.ssr
        }
      }
    })
    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'mutation { updateSetting(ssr: ' + !this.state.setting.ssr + ') { ssr } }',
      }),
      credentials: 'include',
    })
    const {data} = await resp.json();
    if(data.updateSetting) {
      message.success('Update successful');
      this.setState((prevState) => {
        return {
          ...prevState,
          setting: {
            ...prevState.setting,
            ssr: data.updateSetting.ssr
          }
        }
      })
    } else {
      this.setState((prevState) => {
        return {
          ...prevState,
          setting: {
            ...prevState.setting,
            ssr: !prevState.setting.ssr
          }
        }
      })
    }
  }

  render() {
    return (
        <div>
          {this.state.setting.ssr !== undefined &&
          <Row className="padding-5">
            <b>SSR: </b>
            <Switch checked={this.state.setting.ssr} onChange={() => this.toggleSSR()} />
          </Row>}
        </div>
    );
  }
}

export default Setting
