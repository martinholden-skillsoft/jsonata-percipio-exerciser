import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';
import FileDownload from 'react-file-download';
import { accessSafe } from 'access-safe';
import { v4 as uuidv4 } from 'uuid';
import PapaParse from 'papaparse';
import _ from 'lodash';

import Editor from './JSONEditor';
import EditorNav from './EditorNav';
import Notification from './Notification';

/**
 * A wrapper for the react-monaco-editor that adds a layout method and
 * some convenient props.
 */
export default class JSONEditorWithNav extends Component {
  constructor(props) {
    super(props);
    this.editorDidMount = this.editorDidMount.bind(this);
    this._onFormatClick = this._onFormatClick.bind(this);
    this._onDownloadClick = this._onDownloadClick.bind(this);
    this._onDownloadCSVClick = this._onDownloadCSVClick.bind(this);
    this.notificationElement = React.createRef();

    this.papaparseConfig = {
      quotes: true,
      quoteChar: '"',
      escapeChar: '"',
      delimiter: ',',
      header: true,
      newline: '\r\n',
    };

    this.state = {
      width: props.width || '100%',
      height: props.height || '100%',
      filename: `${accessSafe(() => this.props.label, 'filename')}.json`.toLowerCase(),
      csvfilename: `${accessSafe(() => this.props.label, 'filename')}.csv`.toLowerCase(),
      info: props.info || null,
    };

    this.editor = null;
  }

  /**
   * Get the Monaco Editor model if it exists.
   *
   * @return {ITextModel|null}
   * @memberof EnhancedEditor
   */
  getModel() {
    return this.editor.getModel();
  }

  /**
   * Get the text stored in the Monaco Editor model .
   *
   * @return {*}
   * @memberof EnhancedEditor
   */
  getValue() {
    return this.editor.getValue();
  }

  /**
   * Set the text in the Monaco Editor model.
   *
   * @param {*} value
   * @memberof EnhancedEditor
   */
  setValue(value) {
    return this.editor.setValue(value);
  }

  /**
   * Set the info in the Navbar.
   *
   * @param {*} text
   * @memberof EnhancedEditor
   */
  setInfo(info) {
    return this.setState({
      info,
    });
  }

  /**
   * Clear any decorations from editor
   *
   */
  clearDecorations() {
    return this.editor.clearDecorations();
  }

  onResize = (width, height) => {
    this.setState({
      width,
      height,
    });
    this.editor.resize(width, height);
  };

  layout() {
    this.editor.layout();
  }

  /**
   * Add an error decoration based on start and end position
   *
   * @param {integer} start
   * @param {integer} end
   */
  addErrorDecoration(start, end) {
    this.editor.addErrorDecoration(start, end);
  }

  _onFormatClick(eventKey, event) {
    const value = this.getValue();
    const formatted = JSON.stringify(JSON.parse(value), null, 2);
    this.setValue(formatted);
  }

  _onDownloadClick(eventKey, event) {
    FileDownload(this.getValue(), this.state.filename, 'text/plain');
  }

  _onDownloadCSVClick(eventKey, event) {
    let data = JSON.parse(this.getValue());
    if (!_.isArray(data)) {
      data = [data];
    }
    try {
      const csv = PapaParse.unparse(data, this.papaparseConfig);
      if (!_.isEmpty(csv)) {
        FileDownload(csv, this.state.csvfilename, 'text/csv');
      } else {
        this.notificationElement.current.setMessage('The JSON parsed to CSV was an empty file.');
      }
    } catch (error) {
      this.notificationElement.current.setMessage(
        `There was a problem parsing the JSON to CSV. Err: ${error.message}`,
        'danger'
      );
    }
  }

  /**
   * Add an error decoration based on extracting position from
   * err, supports json and jsonata
   *
   * @param {*} err
   */
  addErrorDecorationFromErr(err) {
    this.editor.addErrorDecorationFromErr(err);
  }

  /**
   * This method is called when a component is being removed from the DOM
   *
   */
  componentWillUnmount() {
    this.editor = null;
  }

  /**
   * An event emitted when the editor has been mounted (similar to componentDidMount of React).
   *
   */
  editorDidMount(editor, monaco) {
    this.editor = editor;
    // Bubble up the event
    if (this.props.editorDidMount) {
      this.props.editorDidMount(this, monaco);
    }
  }

  render() {
    const {
      formatEnabled,
      downloadEnabled,
      downloadCSVEnabled,
      label,
      options = {},
      editorDidMount,
      className,
      value,
      id,
      ...other
    } = this.props;

    return (
      <ReactResizeDetector
        id={id}
        key={id + '-resizedetector'}
        handleWidth={true}
        handleHeight={true}
        onResize={this.onResize}
      >
        <div className={className}>
          <Notification
            id={id}
            ref={this.notificationElement}
            key={id + '-notification'}
            autodismiss={true}
            delay={3000}
          ></Notification>
          <EditorNav
            id={id}
            key={id + '-editor-nav'}
            label={label}
            info={this.state.info}
            navLinks={[
              {
                enabled: formatEnabled,
                label: 'Format',
                tooltip: 'Format the editor contents',
                onClick: this._onFormatClick,
              },
              {
                enabled: downloadEnabled,
                label: 'Download',
                tooltip: 'Download the editor contents',
                onClick: this._onDownloadClick,
              },
              {
                enabled: downloadCSVEnabled,
                label: 'Download CSV',
                tooltip: 'Download the editor contents as CSV (UTF-8)',
                onClick: this._onDownloadCSVClick,
              },
            ]}
          />

          <Editor
            id={id}
            key={id + '-editor'}
            width={this.state.width}
            height={this.state.height}
            value={value}
            options={{
              ...options,
            }}
            {...other}
            editorDidMount={this.editorDidMount}
          />
        </div>
      </ReactResizeDetector>
    );
  }
}

JSONEditorWithNav.propTypes = {
  editorDidMount: PropTypes.func,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  options: PropTypes.object,
  value: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  formatEnabled: PropTypes.bool,
  downloadEnabled: PropTypes.bool,
  downloadCSVEnabled: PropTypes.bool,
  label: PropTypes.string,
  info: PropTypes.string,
  id: PropTypes.string,
};

JSONEditorWithNav.defaultProps = {
  className: 'resizable-editor-withnav',
  formatEnabled: true,
  downloadEnabled: true,
  downloadCSVEnabled: false,
  label: 'JSON Editor with Nav',
  info: null,
  id: uuidv4(),
};
