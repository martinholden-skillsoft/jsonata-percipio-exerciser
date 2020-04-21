/**
 * © Copyright IBM Corp. 2016, 2020 All Rights Reserved
 *   Project name: JSONata
 *   This project is licensed under the MIT License, see LICENSE
 */

import React from 'react';
import SplitPane from 'react-split-pane';
import MonacoEditor from 'react-monaco-editor';
import sample from './sample';
import logo from './images/JSONata-white-38.png';
import docs from './images/docs-white-32.png';
import docspercipio from './images/docs-white-percipio.png';
import jsonataMode from './jsonataMode';
import _ from 'lodash';

class Exerciser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      json: JSON.stringify(sample.Metadata.json, null, 2),
      jsonata: sample.Metadata.jsonata,
      baseconfig: JSON.stringify(sample.Metadata.baseconfig || {}, null, 2),
      customerconfig: JSON.stringify(sample.Metadata.customerconfig || {}, null, 2),
      result: '',
    };
  }

  componentDidMount() {
    this.loadJSONata();
    this.eval();
  }

  jsonEditorDidMount(editor) {
    console.log('editorDidMount', editor);
    this.jsonEditor = editor;
    editor.decorations = [];
    //editor.focus();
  }

  jsonataEditorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    this.monaco = monaco;
    this.jsonataEditor = editor;
    editor.decorations = [];

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

  baseconfigEditorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    this.monaco = monaco;
    this.baseconfigEditor = editor;
    editor.decorations = [];
  }

  customerconfigEditorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    this.monaco = monaco;
    this.customerconfigEditor = editor;
    editor.decorations = [];
  }

  onChangeData(newValue, e) {
    this.setState({ json: newValue });
    console.log('onChangeData', newValue, e);
    clearTimeout(this.timer);
    this.timer = setTimeout(this.eval.bind(this), 500);
    this.clearMarkers();
  }

  onChangeExpression(newValue, e) {
    this.setState({ jsonata: newValue });
    console.log('onChangeExpression', newValue, e);
    clearTimeout(this.timer);
    this.timer = setTimeout(this.eval.bind(this), 500);
    this.clearMarkers();
  }

  onChangeBaseconfig(newValue, e) {
    this.setState({ baseconfig: newValue });
    console.log('onChangeBaseconfig', newValue, e);
    clearTimeout(this.timer);
    this.timer = setTimeout(this.eval.bind(this), 500);
    this.clearMarkers();
  }

  onChangeCustomerconfig(newValue, e) {
    this.setState({ customerconfig: newValue });
    console.log('onChangeCustomerconfig', newValue, e);
    clearTimeout(this.timer);
    this.timer = setTimeout(this.eval.bind(this), 500);
    this.clearMarkers();
  }

  format() {
    const formatted = JSON.stringify(JSON.parse(this.state.json), null, 2);
    this.setState({ json: formatted });
  }

  formatbaseconfig() {
    const formatted = JSON.stringify(JSON.parse(this.state.baseconfig), null, 2);
    this.setState({ baseconfig: formatted });
  }

  formatcustomerconfig() {
    const formatted = JSON.stringify(JSON.parse(this.state.customerconfig), null, 2);
    this.setState({ customerconfig: formatted });
  }

  loadJSONata() {
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.jsdelivr.net/npm/jsonata@1.8.1/jsonata.min.js';

    const scriptpercipio = document.createElement('script');
    scriptpercipio.type = 'text/javascript';
    scriptpercipio.src = 'https://content-discovery-dev.qa.pints.io/scripts/percipio-jsonata.js';
    this.local = false;
    head.appendChild(script);
    head.appendChild(scriptpercipio);
  }

  changeSample(event) {
    console.log(event.target.value);
    const data = sample[event.target.value];
    console.log(data);
    this.setState({
      json: JSON.stringify(data.json, null, 2),
      jsonata: data.jsonata,
      baseconfig: JSON.stringify(data.baseconfig || {}, null, 2),
      customerconfig: JSON.stringify(data.customerconfig || {}, null, 2),
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(this.eval.bind(this), 100);
    this.clearMarkers();
  }

  eval() {
    let input, jsonataResult, baseconfig, customerconfig, binding;

    if (typeof window.jsonataExtended === 'undefined') {
      this.timer = setTimeout(this.eval.bind(this), 500);
      return;
    }

    try {
      input = JSON.parse(this.state.json);
    } catch (err) {
      console.log(err);
      this.setState({ result: 'ERROR IN INPUT DATA: ' + err.message });
      const pos = err.message.indexOf('at position ');
      console.log('pos=', pos);
      if (pos !== -1) {
        console.log(err);
        const start = parseInt(err.message.substr(pos + 12)) + 1;
        this.errorMarker(start, start + 1, this.jsonEditor, this.state.json);
      }
      return;
    }

    try {
      baseconfig = JSON.parse(this.state.baseconfig);
    } catch (err) {
      console.log(err);
      this.setState({ result: 'ERROR IN BASE CONFIGURATION DATA: ' + err.message });
      const pos = err.message.indexOf('at position ');
      console.log('pos=', pos);
      if (pos !== -1) {
        console.log(err);
        const start = parseInt(err.message.substr(pos + 12)) + 1;
        this.errorMarker(start, start + 1, this.baseconfigEditor, this.state.baseconfig);
      }
      return;
    }

    try {
      customerconfig = JSON.parse(this.state.customerconfig);
    } catch (err) {
      console.log(err);
      this.setState({ result: 'ERROR IN CUSTOMER CONFIGURATION DATA: ' + err.message });
      const pos = err.message.indexOf('at position ');
      console.log('pos=', pos);
      if (pos !== -1) {
        console.log(err);
        const start = parseInt(err.message.substr(pos + 12)) + 1;
        this.errorMarker(start, start + 1, this.customerconfigEditor, this.state.customerconfig);
      }
      return;
    }

    binding = _.merge({}, baseconfig, customerconfig);
    // binding = {};

    try {
      if (this.state.jsonata !== '') {
        jsonataResult = this.evalJsonata(input, binding);
        this.setState({ result: jsonataResult });
      }
    } catch (err) {
      this.setState({ result: err.message || String(err) });
      console.log(err);
      const end = err.position + 1;
      const start = end - (err.token ? err.token.length : 1);
      this.errorMarker(start, end, this.jsonataEditor, this.state.jsonata);
    }
  }

  errorMarker(start, end, editor, buffer) {
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
    editor.decorations = editor.deltaDecorations(editor.decorations, [
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
    ]);
  }

  clearMarkers() {
    this.jsonataEditor.decorations = this.jsonataEditor.deltaDecorations(
      this.jsonataEditor.decorations,
      []
    );
    this.jsonEditor.decorations = this.jsonEditor.deltaDecorations(this.jsonEditor.decorations, []);
    this.baseconfigEditor.decorations = this.baseconfigEditor.deltaDecorations(
      this.baseconfigEditor.decorations,
      []
    );
    this.customerconfigEditor.decorations = this.customerconfigEditor.deltaDecorations(
      this.customerconfigEditor.decorations,
      []
    );
  }

  evalJsonata(input, binding) {
    const expr = window.jsonataExtended(this.state.jsonata);

    expr.assign('trace', function (arg) {
      console.log(arg);
    });

    if (!this.local) {
      this.timeboxExpression(expr, 3000, 500);
    }

    let pathresult = expr.evaluate(input, binding);
    if (typeof pathresult === 'undefined') {
      pathresult = '** no match **';
    } else {
      pathresult = JSON.stringify(
        pathresult,
        function (key, val) {
          return typeof val !== 'undefined' && val !== null && val.toPrecision
            ? Number(val.toPrecision(13))
            : val && (val._jsonata_lambda === true || val._jsonata_function === true)
            ? '{function:' + (val.signature ? val.signature.definition : '') + '}'
            : typeof val === 'function'
            ? '<native function>#' + val.length
            : val;
        },
        2
      );
    }
    return pathresult;
  }

  timeboxExpression(expr, timeout, maxDepth) {
    let depth = 0;
    const time = Date.now();

    const checkRunnaway = function () {
      if (depth > maxDepth) {
        // stack too deep
        // eslint-disable-next-line  no-throw-literal
        throw {
          code: 'U1001',
          message:
            'Stack overflow error: Check for non-terminating recursive function.  Consider rewriting as tail-recursive.',
          stack: new Error().stack,
        };
      }
      if (Date.now() - time > timeout) {
        // expression has run for too long
        // eslint-disable-next-line  no-throw-literal
        throw {
          code: 'U1002',
          message: 'Expression evaluation timeout: Check for infinite loop',
          stack: new Error().stack,
        };
      }
    };

    // register callbacks
    expr.assign('__evaluate_entry', function () {
      depth++;
      checkRunnaway();
    });
    expr.assign('__evaluate_exit', function () {
      depth--;
      checkRunnaway();
    });
  }

  render() {
    const options = {
      minimap: { enabled: false },
      lineNumbers: 'off',
      contextmenu: false,
      automaticLayout: true,
      scrollBeyondLastLine: false,
      extraEditorClassName: 'editor-pane',
    };

    return (
      <div className="App">
        <header className="App-header">
          <div id="banner">
            <div id="logo">
              <img src={logo} alt={'JSONata'} />
            </div>
            <div id="banner-strip" className="bannerpart">
              <div id="banner1">JSONata Percipio Exerciser</div>
              <div id="banner4">
                <a
                  href="https://skillsoftdev.atlassian.net/wiki/spaces/INTROC/pages/1100219620/Percipio+JSONata+Transform+Library"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={docspercipio} alt="JSONata Percipio Documentation" />
                </a>
                <a
                  href="https://docs.jsonata.org/overview"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={docs} alt="JSONata Documentation" />
                </a>
              </div>
            </div>
          </div>
        </header>

        <SplitPane split="vertical" minSize={100} defaultSize={'50%'}>
          <SplitPane split="horizontal" minSize={50} defaultSize={'50%'}>
            <div className="pane">
              <div id="banner">
                <div id="banner-strip" className="bannerpart">
                  <div id="banner1">Source Data</div>
                  <div id="banner4" className="bannerlink" onClick={this.format.bind(this)}>
                    Format JSON
                  </div>
                </div>
              </div>
              <MonacoEditor
                language="json"
                theme="jsonataTheme"
                value={this.state.json}
                options={options}
                onChange={this.onChangeData.bind(this)}
                editorDidMount={this.jsonEditorDidMount.bind(this)}
              />

              <select id="sample-data" onChange={this.changeSample.bind(this)}>
                <option value="Metadata">Metadata</option>
                <option value="LearnerActivity">Learner Activity</option>
              </select>
            </div>
            <div className="pane">
              <div id="banner">
                <div id="banner-strip" className="bannerpart">
                  <div id="banner1">Results</div>
                </div>
              </div>
              <MonacoEditor
                language="json"
                theme="jsonataTheme"
                value={this.state.result}
                options={{
                  lineNumbers: 'off',
                  minimap: { enabled: false },
                  automaticLayout: true,
                  contextmenu: false,
                  scrollBeyondLastLine: false,
                  readOnly: true,
                  extraEditorClassName: 'result-pane',
                }}
              />
            </div>
          </SplitPane>
          <SplitPane split="horizontal" minSize={50} defaultSize={'50%'}>
            <SplitPane split="vertical" minSize={100} defaultSize={'50%'}>
              <div className="pane">
                <div id="banner">
                  <div id="banner-strip" className="bannerpart">
                    <div id="banner1">Base Configuration</div>
                    <div
                      id="banner4"
                      className="bannerlink"
                      onClick={this.formatbaseconfig.bind(this)}
                    >
                      Format JSON
                    </div>
                  </div>
                </div>
                <MonacoEditor
                  language="json"
                  theme="jsonataTheme"
                  value={this.state.baseconfig}
                  options={options}
                  onChange={this.onChangeBaseconfig.bind(this)}
                  editorDidMount={this.baseconfigEditorDidMount.bind(this)}
                />
              </div>
              <div className="pane">
                <div id="banner">
                  <div id="banner-strip" className="bannerpart">
                    <div id="banner1">Customer Configuration</div>
                    <div
                      id="banner4"
                      className="bannerlink"
                      onClick={this.formatcustomerconfig.bind(this)}
                    >
                      Format JSON
                    </div>
                  </div>
                </div>
                <MonacoEditor
                  language="json"
                  theme="jsonataTheme"
                  value={this.state.customerconfig}
                  options={options}
                  onChange={this.onChangeCustomerconfig.bind(this)}
                  editorDidMount={this.customerconfigEditorDidMount.bind(this)}
                />
              </div>
            </SplitPane>

            <div className="pane">
              <div id="banner">
                <div id="banner-strip" className="bannerpart">
                  <div id="banner1">Transform</div>
                </div>
              </div>
              <MonacoEditor
                language="jsonata"
                theme="jsonataTheme"
                value={this.state.jsonata}
                options={options}
                onChange={this.onChangeExpression.bind(this)}
                editorWillMount={jsonataMode.bind(this)}
                editorDidMount={this.jsonataEditorDidMount.bind(this)}
              />
            </div>
          </SplitPane>
        </SplitPane>
      </div>
    );
  }
}

export default Exerciser;
