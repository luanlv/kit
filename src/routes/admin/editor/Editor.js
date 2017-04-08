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
import s from './style.css';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import {convertFromHTML} from 'draft-convert'
import { Button, DatePicker} from 'antd';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import ColorPic from './ColorPicker'

const sampleMarkup =
  '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
  '<a href="http://www.facebook.com">Example link</a>';

class EditorComponent extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  constructor(props){
    super(props)
    this.state = {
      content: sampleMarkup
    }
  }
  uploadCallback (file) {
    return new Promise(
      (resolve, reject) => {
        alert('co loi')
        reject('error')
        // resolve({data: {link: "http://localhost:3001/image/UddsI8tE9H-1.png"}});
      }
    );
  }

  onEditorStateChange (editorContent){
    this.setState({
      content: draftToHtml(convertToRaw(editorContent.getCurrentContent()))
    })
  };
  render() {
    console.log(this.state.content)
    const editorContent = EditorState.createWithContent(convertFromHTML(this.state.content))
    return (
        <div className="admin-editor">
          <Editor
            defaultEditorState = {editorContent}
            toolbarClassName="home-toolbar"
            wrapperClassName="home-wrapper"
            editorClassName="home-editor"
            toolbar={{
              colorPicker: { component: ColorPic },
              image: { uploadCallback: this.uploadCallback }}}
            onEditorStateChange={(content) => this.onEditorStateChange(content)}
          />
        </div>
    );
  }
}

export default withStyles(s)(EditorComponent)
