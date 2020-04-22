/**
 * © Copyright IBM Corp. 2016, 2020 All Rights Reserved
 *   Project name: JSONata
 *   This project is licensed under the MIT License, see LICENSE
 */

import React from 'react';
import SplitPane from 'react-split-pane';
import sample from './sample';
import logo from './images/JSONata-white-38.png';
import docs from './images/docs-white-32.png';
import docspercipio from './images/docs-white-percipio.png';
import _ from 'lodash';
import EnhancedMonacoEditor from './EnhancedEditor';

class Exerciser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      json: JSON.stringify(sample.DegreedMetadata.json, null, 2),
      jsonata: sample.DegreedMetadata.jsonata,
      baseconfig: JSON.stringify(sample.DegreedMetadata.baseconfig || {}, null, 2),
      customerconfig: JSON.stringify(sample.DegreedMetadata.customerconfig || {}, null, 2),
      result: '',
    };
  }

  componentDidMount() {
    this.loadJSONata();
    this.eval();
  }

  jsonEditorDidMount(editor, monaco) {
    this.jsonEditor = editor;
  }

  jsonataEditorDidMount(editor, monaco) {
    this.jsonataEditor = editor;
  }

  baseconfigEditorDidMount(editor, monaco) {
    this.baseconfigEditor = editor;
  }

  customerconfigEditorDidMount(editor, monaco) {
    this.customerconfigEditor = editor;
  }

  resultsEditorDidMount(editor, monaco) {
    this.resultsEditor = editor;
  }

  onChangeData(newValue, e) {
    this.setState({ json: newValue });
    clearTimeout(this.timer);
    this.timer = setTimeout(this.eval.bind(this), 500);
    this.clearMarkers();
  }

  onChangeExpression(newValue, e) {
    this.setState({ jsonata: newValue });
    clearTimeout(this.timer);
    this.timer = setTimeout(this.eval.bind(this), 500);
    this.clearMarkers();
  }

  onChangeBaseconfig(newValue, e) {
    this.setState({ baseconfig: newValue });
    clearTimeout(this.timer);
    this.timer = setTimeout(this.eval.bind(this), 500);
    this.clearMarkers();
  }

  onChangeCustomerconfig(newValue, e) {
    this.setState({ customerconfig: newValue });
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
    const data = sample[event.target.value];
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
      this.setState({ result: 'ERROR IN INPUT JSON DATA: ' + err.message });
      this.jsonEditor.addErrorDecorationFromErr(err);
      return;
    }

    try {
      baseconfig = JSON.parse(this.state.baseconfig);
    } catch (err) {
      this.setState({ result: 'ERROR IN BASE CONFIGURATION JSON DATA: ' + err.message });
      this.baseconfigEditor.addErrorDecorationFromErr(err);
      return;
    }

    try {
      customerconfig = JSON.parse(this.state.customerconfig);
    } catch (err) {
      this.setState({ result: 'ERROR IN CUSTOMER CONFIGURATION JSON DATA: ' + err.message });
      this.customerconfigEditor.addErrorDecorationFromErr(err);
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
      this.jsonataEditor.addErrorDecorationFromErr(err);
    }
  }

  clearMarkers() {
    this.jsonataEditor.clearDecorations();
    this.jsonEditor.clearDecorations();
    this.baseconfigEditor.clearDecorations();
    this.customerconfigEditor.clearDecorations();
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

    const resultsoptions = {
      lineNumbers: 'off',
      minimap: { enabled: false },
      automaticLayout: true,
      contextmenu: false,
      scrollBeyondLastLine: false,
      readOnly: true,
      extraEditorClassName: 'result-pane',
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
            <div className="subpane">
              <div className="panebanner">
                <div className=" panebanner-strip panebannerpart">
                  <div>Source Data</div>
                  <div className="panebannerright bannerlink">
                    <select id="sample-data" onChange={this.changeSample.bind(this)}>
                      <option value="DegreedMetadata">Degreed - Metadata</option>
                      <option value="SabaCloudMetadata">SabaCloud - Metadata</option>
                      <option value="SuccessFactorsMetadata">Successfactors - Metadata</option>
                      <option value="Metadata">Metadata</option>
                      <option value="LearnerActivity">Learner Activity</option>
                    </select>
                  </div>
                  <div className="panebannerright bannerlink" onClick={this.format.bind(this)}>
                    Format JSON
                  </div>
                </div>
              </div>
              <div className="paneeditor">
                <EnhancedMonacoEditor
                  language="json"
                  theme="jsonataTheme"
                  value={this.state.json}
                  options={options}
                  onChange={this.onChangeData.bind(this)}
                  editorDidMount={this.jsonEditorDidMount.bind(this)}
                />
              </div>
            </div>
            <div className="subpane">
              <div className="panebanner">
                <div className=" panebanner-strip panebannerpart">
                  <div>Results</div>
                </div>
              </div>
              <div className="paneeditor">
                <EnhancedMonacoEditor
                  language="json"
                  theme="jsonataTheme"
                  value={this.state.result}
                  options={resultsoptions}
                  editorDidMount={this.resultsEditorDidMount.bind(this)}
                />
              </div>
            </div>
          </SplitPane>
          <SplitPane split="horizontal" minSize={50} defaultSize={'50%'}>
            <SplitPane split="vertical" minSize={100} defaultSize={'50%'}>
              <div className="subpane">
                <div className="panebanner">
                  <div className=" panebanner-strip panebannerpart">
                    <div>Base Configuration</div>
                    <div
                      className="panebannerright bannerlink"
                      onClick={this.formatbaseconfig.bind(this)}
                    >
                      Format JSON
                    </div>
                  </div>
                </div>
                <div className="paneeditor">
                  <EnhancedMonacoEditor
                    language="json"
                    theme="jsonataTheme"
                    value={this.state.baseconfig}
                    options={options}
                    onChange={this.onChangeBaseconfig.bind(this)}
                    editorDidMount={this.baseconfigEditorDidMount.bind(this)}
                  />
                </div>
              </div>
              <div className="subpane">
                <div className="panebanner">
                  <div className="panebanner-strip panebannerpart">
                    <div>Customer Configuration</div>
                    <div
                      className="panebannerright bannerlink"
                      onClick={this.formatcustomerconfig.bind(this)}
                    >
                      Format JSON
                    </div>
                  </div>
                </div>
                <div className="paneeditor">
                  <EnhancedMonacoEditor
                    language="json"
                    theme="jsonataTheme"
                    value={this.state.customerconfig}
                    options={options}
                    onChange={this.onChangeCustomerconfig.bind(this)}
                    editorDidMount={this.customerconfigEditorDidMount.bind(this)}
                  />
                </div>
              </div>
            </SplitPane>
            <div className="subpane">
              <div className="panebanner">
                <div className=" panebanner-strip panebannerpart">
                  <div>Transform</div>
                </div>
              </div>
              <div className="paneeditor">
                <EnhancedMonacoEditor
                  language="jsonata"
                  theme="jsonataTheme"
                  value={this.state.jsonata}
                  options={options}
                  onChange={this.onChangeExpression.bind(this)}
                  editorDidMount={this.jsonataEditorDidMount.bind(this)}
                />
              </div>
            </div>
          </SplitPane>
        </SplitPane>
      </div>
    );
  }
}

export default Exerciser;
