import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MonacoEditor from 'react-monaco-editor';
import ReactResizeDetector from 'react-resize-detector';
import registerJsonataLanguage from './monacoIntegration/jsonata';
import EditorNav from './EditorNav';

/**
 * A wrapper for the react-monaco-editor that adds a layout method and
 * some convenient props.
 */
export default class EnhancedEditorWithNav extends Component {
  constructor(props) {
    super(props);
    this.monacoEditor = null;
    this.monaco = null;
    this.editorDidMount = this.editorDidMount.bind(this);
    this._onFormatClick = this._onFormatClick.bind(this);
  }

  /**
   * Trigger layout
   *
   */
  layout() {
    if (this.monacoEditor != null) {
      this.monacoEditor.layout();
    }
  }

  /**
   * Clear any decorations from editor
   *
   */
  clearDecorations() {
    if (this.monacoEditor != null) {
      this.monacoEditor.decorations = this.monacoEditor.deltaDecorations(
        this.monacoEditor.decorations,
        []
      );
    }
  }

  /**
   * Add an error decoration based on start and end position
   *
   * @param {integer} start
   * @param {integer} end
   */
  addErrorDecoration(start, end) {
    if (this.monacoEditor != null) {
      const buffer = this.monacoEditor.getModel().getValue();
      const resolve = (offset) => {
        let line = 1;
        let column = 1;
        let position = 1;
        while (position < offset) {
          if (buffer.charAt(position) === '\n') {
            line++;
            column = 0;
          } else {
            column++;
          }
          position++;
        }
        return { line, column };
      };
      const from = resolve(start);
      const to = resolve(end);
      this.monacoEditor.decorations = this.monacoEditor.deltaDecorations(
        this.monacoEditor.decorations,
        [
          {
            range: new this.monaco.Range(from.line, from.column, to.line, to.column),
            options: { inlineClassName: 'jsonataErrorMarker' },
          },
          {
            range: new this.monaco.Range(from.line, 1, to.line, 1),
            options: {
              isWholeLine: true,
              linesDecorationsClassName: 'jsonataErrorMargin',
            },
          },
        ]
      );
    }
  }

  updateNoUndo(text) {
    const model = this.getModel();
    model.applyEdits([
      {
        range: new this.monaco.Range(
          1,
          1,
          model.getLineCount(),
          model.getLineMaxColumn(model.getLineCount())
        ),
        text,
      },
    ]);
  }

  _onFormatClick(eventKey, event) {
    if (this.props.formatEnabled && this.props.language === 'json') {
      const model = this.getModel();
      const formatted = JSON.stringify(JSON.parse(model.getValue()), null, 2);
      this.updateNoUndo(formatted);
    }
  }

  /**
   * Add an error decoration based on extracting position from
   * err, supports json and jsonata
   *
   * @param {*} err
   */
  addErrorDecorationFromErr(err) {
    let start = 0;
    let end = 0;

    if (this.props.language === 'json') {
      const pos = err.message.indexOf('at position ');
      if (pos !== -1) {
        start = parseInt(err.message.substr(pos + 12)) + 1;
        end = start + 1;
      }
    }

    if (this.props.language === 'jsonata') {
      end = err.position + 1;
      start = end - (err.token ? err.token.length : 1);
    }

    if (this.monacoEditor != null && start !== end) {
      this.addErrorDecoration(start, end);
    }
  }

  /**
   * This method is called when a component is being removed from the DOM
   *
   */
  componentWillUnmount() {
    this.monacoEditor = null;
    this.monaco = null;
  }

  /**
   * An event emitted when the editor has been mounted (similar to componentDidMount of React).
   *
   */
  editorDidMount(editor, monaco) {
    editor.decorations = [];
    if (this.props.language === 'jsonata') {
      registerJsonataLanguage(monaco);
      monaco.editor.setModelLanguage(editor.getModel(), 'jsonata');
      editor.addAction({
        id: 'jsonata-lambda',
        label: 'Lambda',
        keybindings: [monaco.KeyCode.F11],
        run: function (ed) {
          ed.trigger('keyboard', 'type', { text: 'λ' });
          return null;
        },
      });
    }
    this.monacoEditor = editor;
    this.monaco = monaco;

    // Bubble up the event
    if (this.props.editorDidMount) {
      this.props.editorDidMount(this, monaco);
    }
  }

  render() {
    const {
      width,
      height,
      readOnly,
      value,
      formatEnabled,
      label,
      options = {},
      editorDidMount,
      className,
      ...other
    } = this.props;

    return (
      <div className={className}>
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={() => {
            this.layout();
          }}
        >
          <EditorNav
            key={`nav-${label}`}
            label={label}
            formatEnabled={formatEnabled}
            onFormatClick={this._onFormatClick}
          />
          <MonacoEditor
            key={`editor-${label}`}
            width={width || '100%'}
            height={height || '100%'}
            value={value}
            options={{
              ...options,
            }}
            {...other}
            editorDidMount={this.editorDidMount}
          />
        </ReactResizeDetector>
      </div>
    );
  }
}

EnhancedEditorWithNav.propTypes = {
  editorDidMount: PropTypes.func,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  options: PropTypes.object,
  value: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  formatEnabled: PropTypes.bool,
  label: PropTypes.string,
};

EnhancedEditorWithNav.defaultProps = {
  className: 'enhanced-editor',
  formatEnabled: true,
  label: 'Editor',
};
