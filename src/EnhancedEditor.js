import React, { Component, PropTypes } from 'react';
import MonacoEditor from 'react-monaco-editor';
import registerJsonataLanguage from './monacoIntegration/jsonata';
import ReactResizeDetector from 'react-resize-detector';

/**
 * A wrapper for the react-monaco-editor that adds a layout method and
 * some convenient props.
 */
export default class EnhancedEditor extends Component {
  layout() {
    if (this.editor != null) {
      this.editor.layout();
    }
  }

  componentWillUnmount() {
    this.editor = null;
  }

  editorDidMount = (editor, monaco) => {
    this.editor = editor;
    if (this.props.editorDidMount) {
      this.props.editorDidMount(editor, monaco);
    }

    registerJsonataLanguage(monaco);
    if (this.props.language === 'jsonata') {
      monaco.editor.setModelLanguage(editor.getModel(), 'jsonata');
    }
  };

  render() {
    const { width, height, readOnly, value, options = {}, ...other } = this.props;

    return (
      <ReactResizeDetector
        handleWidth
        handleHeight
        onResize={() => {
          this.layout();
        }}
      >
        <MonacoEditor
          width={width || '100%'}
          height={height || '100%'}
          value={value}
          options={{
            readOnly: readOnly,
            folding: true,
            ...options,
          }}
          editorDidMount={this.editorDidMount}
          {...other}
        />
      </ReactResizeDetector>
    );
  }
}

EnhancedEditor.propTypes = {
  annotations: PropTypes.arrayOf(
    PropTypes.shape({
      // TODO
    })
  ),
  editorDidMount: PropTypes.func,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      // TODO
    })
  ),
  onChange: PropTypes.func,
  options: PropTypes.object,
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
