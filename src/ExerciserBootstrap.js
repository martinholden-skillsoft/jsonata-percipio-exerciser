/**
 * © Copyright IBM Corp. 2016, 2020 All Rights Reserved
 *   Project name: JSONata
 *   This project is licensed under the MIT License, see LICENSE
 *
 * Enhanced by Martin Holden
 */

import React from 'react';
import sources from './data/sources';
import sampledata from './data/sampledata';
import _ from 'lodash';
import EnhancedMonacoEditor from './components/EnhancedEditor';
import EditorNav from './components/EditorNav';
import MainNav from './components/MainNav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './ExerciserBootstrap.css';

class ExerciserBootstrap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      json: JSON.stringify({}, null, 2),
      jsonata: `$.{}`,
      baseconfig: JSON.stringify({}, null, 2),
      customerconfig: JSON.stringify({}, null, 2),
      result: null,
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

  formatsource() {
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

  changeData(eventkey, event) {
    const selected = sources[eventkey];
    this.setState({
      json: JSON.stringify(sampledata[selected.type], null, 2),
      jsonata: selected.jsonata,
      baseconfig: JSON.stringify(selected.baseconfig || {}, null, 2),
      customerconfig: JSON.stringify(selected.customerconfig || {}, null, 2),
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
      <Container fluid>
        <MainNav sources={sources} onSourceSelect={this.changeData.bind(this)} />
        <Row>
          <Col>
            <Tabs defaultActiveKey="transform" transition={false} id="transform-config">
              <Tab eventKey="transform" title="Transform" className="border">
                <EditorNav label="Transform" formatEnabled={false} />
                <EnhancedMonacoEditor
                  language="jsonata"
                  theme="jsonataTheme"
                  value={this.state.jsonata}
                  options={options}
                  onChange={this.onChangeExpression.bind(this)}
                  editorDidMount={this.jsonataEditorDidMount.bind(this)}
                />
              </Tab>
              <Tab eventKey="baseconfig" title="Base Configuration" className="border">
                <EditorNav
                  label="Base Configuration"
                  formatEnabled={true}
                  onFormatClick={this.formatbaseconfig.bind(this)}
                />
                <EnhancedMonacoEditor
                  language="json"
                  theme="jsonataTheme"
                  value={this.state.baseconfig}
                  options={options}
                  onChange={this.onChangeBaseconfig.bind(this)}
                  editorDidMount={this.baseconfigEditorDidMount.bind(this)}
                />
              </Tab>
              <Tab eventKey="customerconfig" title="Customer Configuration" className="border">
                <EditorNav
                  label="Customer Configuration"
                  formatEnabled={true}
                  onFormatClick={this.formatcustomerconfig.bind(this)}
                />
                <EnhancedMonacoEditor
                  language="json"
                  theme="jsonataTheme"
                  value={this.state.customerconfig}
                  options={options}
                  onChange={this.onChangeCustomerconfig.bind(this)}
                  editorDidMount={this.customerconfigEditorDidMount.bind(this)}
                />
              </Tab>
            </Tabs>
          </Col>
        </Row>
        <Row>
          <Col>
            <Tabs defaultActiveKey="results" transition={false} id="transform-data">
              <Tab eventKey="source" title="Source Data" className="border">
                <EditorNav
                  label="Source Data"
                  formatEnabled={true}
                  onFormatClick={this.formatsource.bind(this)}
                />
                <EnhancedMonacoEditor
                  language="json"
                  theme="jsonataTheme"
                  value={this.state.json}
                  options={options}
                  onChange={this.onChangeData.bind(this)}
                  editorDidMount={this.jsonEditorDidMount.bind(this)}
                />
              </Tab>
              <Tab eventKey="results" title="Results" className="border">
                <EditorNav label="Results" formatEnabled={false} />
                <EnhancedMonacoEditor
                  language="json"
                  theme="jsonataTheme"
                  value={this.state.result}
                  options={resultsoptions}
                  editorDidMount={this.resultsEditorDidMount.bind(this)}
                />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ExerciserBootstrap;
