/**
 * © Copyright IBM Corp. 2016, 2020 All Rights Reserved
 *   Project name: JSONata
 *   This project is licensed under the MIT License, see LICENSE
 *
 * Enhanced by Martin Holden
 */

import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import JSONEditorWithNav from './components/JSONEditorWithNav';
import JSONATAEditorWithNav from './components/JSONATAEditorWithNav';

import MainNav from './components/MainNav';
import './exerciserbootstrap.css';

import sampledata from './data/sampledata';
import { version } from '../package.json';

class ExerciserBootstrap extends React.Component {
  constructor(props) {
    super(props);

    this.tabsOnSelect = this.tabsOnSelect.bind(this);

    // Get transforms and configurations from window object
    const dataexamples = window.jsonatatransforms;

    this.configurations = dataexamples.configurations.reduce(
      (accumulator, currentValue, index, sourcearray) => {
        accumulator[currentValue.transformId] = currentValue;
        return accumulator;
      },
      {}
    );

    // Remove Workday, Accenture and Sumtotal
    // Then only keep CONTENT_EXPORT and LEARNER_ACTIVITY_REPORT
    this.sources = dataexamples.transforms
      .filter((value, index, sourceArray) => {
        const systemName = value.systemName.toUpperCase();
        return (
          !_.includes(systemName, 'WORKDAY') &&
          !_.includes(systemName, 'ACCENTURE') &&
          !_.includes(systemName, 'SUMTOTAL') &&
          !_.includes(systemName, 'CSOD')
        );
      })
      .filter((value, index, sourceArray) => {
        const typeName = value.type.toUpperCase();
        return typeName === 'CONTENT_EXPORT' || typeName === 'LEARNER_ACTIVITY_REPORT';
      })
      .map((value, index, sourceArray) => {
        const newObj = _.cloneDeep(value);
        newObj.name = `${value.name} - ${value.type}`;
        newObj.type = value.type.toUpperCase();
        // newObj.jsonata = `${value.transform}`;
        newObj.baseconfig = this.configurations[value.id]
          ? this.configurations[value.id].configuration
          : {};
        newObj.configuration = this.configurations[value.id] ? this.configurations[value.id] : {};
        newObj.customerconfig = {};
        return newObj;
      })
      .sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      })
      .reduce((accumulator, currentValue, index, sourcearray) => {
        accumulator[currentValue.id] = currentValue;
        return accumulator;
      }, {});

    this.defaults = {
      empty: {
        id: 'empty',
        name: 'Empty',
        type: 'EMPTY',
        transform: `$.{}`,
        baseconfig: {},
        customerconfig: {},
      },
      samplemetadata: {
        id: 'samplemetadata',
        name: 'Empty - CONTENT_EXPORT',
        type: 'CONTENT_EXPORT',
        transform: `$.{}`,
        baseconfig: {},
        customerconfig: {},
      },
      samplelearningactivity: {
        id: 'samplelearningactivity',
        name: 'Empty - LEARNER_ACTIVITY_REPORT',
        type: 'LEARNER_ACTIVITY_REPORT',
        transform: `$.{}`,
        baseconfig: {},
        customerconfig: {},
      },
    };

    this.sources = {
      ...this.defaults,
      ...this.sources,
    };

    this.data = {
      json: JSON.stringify({}, null, 2),
      transform: `$.{}`,
      baseconfig: JSON.stringify({}, null, 2),
      customerconfig: JSON.stringify({}, null, 2),
      result: null,
      jsonataInfo: null,
    };
  }

  componentDidMount() {
    this.loadJSONata();
    this.eval();
  }

  tabsOnSelect(eventKey, event) {
    this.jsonEditor.layout();
    this.jsonataEditor.layout();
    this.baseconfigEditor.layout();
    this.customerconfigEditor.layout();
    this.resultsEditor.layout();
    console.log(eventKey);
  }

  editorOverwrite(editor, value) {
    if (editor) {
      editor.setValue(value);
    }
  }

  editorInfoUpdated(editor, value) {
    const { createdAt, updatedAt, description } = value || {};

    let info = createdAt ? `Created: ${createdAt}\u000D` : '';
    info += updatedAt ? `Updated: ${updatedAt}\u000D` : '';
    info += description ? `\u000D${description}\u000D` : '';

    if (editor) {
      editor.setInfo(info);
    }
  }

  allEditorsOverwrite() {
    this.editorOverwrite(this.jsonEditor, this.data.json);
    this.editorOverwrite(this.jsonataEditor, this.data.transform);
    this.editorOverwrite(this.baseconfigEditor, this.data.baseconfig);
    this.editorOverwrite(this.customerconfigEditor, this.data.customerconfig);
    this.editorOverwrite(this.resultsEditor, this.data.results);

    this.editorInfoUpdated(this.jsonataEditor, this.data.jsonataInfo);
    this.editorInfoUpdated(this.baseconfigEditor, this.data.jsonataInfo.configuration);
  }

  jsonEditorDidMount(editor, monaco) {
    this.jsonEditor = editor;
    this.editorOverwrite(this.jsonEditor, this.data.json);
  }

  jsonataEditorDidMount(editor, monaco) {
    this.jsonataEditor = editor;
    this.editorOverwrite(this.jsonataEditor, this.data.transform);
  }

  baseconfigEditorDidMount(editor, monaco) {
    this.baseconfigEditor = editor;
    this.editorOverwrite(this.baseconfigEditor, this.data.baseconfig);
  }

  customerconfigEditorDidMount(editor, monaco) {
    this.customerconfigEditor = editor;
    this.editorOverwrite(this.customerconfigEditor, this.data.customerconfig);
  }

  resultsEditorDidMount(editor, monaco) {
    this.resultsEditor = editor;
    this.editorOverwrite(this.resultsEditor, this.data.result);
  }

  onChangeData(newValue, e) {
    this.data.json = newValue;
    clearTimeout(this.timer);
    this.timer = setTimeout(this.eval.bind(this), 750);
    this.clearMarkers();
  }

  onChangeExpression(newValue, e) {
    this.data.transform = newValue;
    clearTimeout(this.timer);
    this.timer = setTimeout(this.eval.bind(this), 750);
    this.clearMarkers();
  }

  onChangeBaseconfig(newValue, e) {
    this.data.baseconfig = newValue;
    clearTimeout(this.timer);
    this.timer = setTimeout(this.eval.bind(this), 750);
    this.clearMarkers();
  }

  onChangeCustomerconfig(newValue, e) {
    this.data.customerconfig = newValue;
    clearTimeout(this.timer);
    this.timer = setTimeout(this.eval.bind(this), 750);
    this.clearMarkers();
  }

  loadJSONata() {
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.jsdelivr.net/npm/jsonata@1.8.1/jsonata.min.js';

    const scriptpercipio = document.createElement('script');
    scriptpercipio.type = 'text/javascript';
    scriptpercipio.src = 'https://api.percipio.com/content-discovery/scripts/percipio-jsonata.js';
    this.local = false;
    head.appendChild(script);
    head.appendChild(scriptpercipio);
  }

  changeData(eventkey, event) {
    const selected = this.sources[eventkey];
    this.data = {
      json: JSON.stringify(sampledata[selected.type], null, 2),
      transform: selected.transform,
      baseconfig: JSON.stringify(selected.baseconfig || {}, null, 2),
      customerconfig: JSON.stringify(selected.customerconfig || {}, null, 2),
      jsonataInfo: selected || null,
    };
    this.allEditorsOverwrite();
    clearTimeout(this.timer);
    this.timer = setTimeout(this.eval.bind(this), 100);
    this.clearMarkers();
  }

  eval() {
    let input, jsonataResult, baseconfig, customerconfig, binding;

    if (typeof window.jsonataExtended === 'undefined') {
      this.timer = setTimeout(this.eval.bind(this), 750);
      return;
    }

    try {
      input = JSON.parse(this.data.json);
    } catch (err) {
      this.data.results = `ERROR IN INPUT JSON DATA: ${err.message}`;
      this.jsonEditor.addErrorDecorationFromErr(err);
      return;
    }

    try {
      baseconfig = JSON.parse(this.data.baseconfig);
    } catch (err) {
      this.data.results = `ERROR IN BASE CONFIGURATION JSON DATA: ${err.message}`;
      this.baseconfigEditor.addErrorDecorationFromErr(err);
      return;
    }

    try {
      customerconfig = JSON.parse(this.data.customerconfig);
    } catch (err) {
      this.data.results = `ERROR IN CUSTOMER CONFIGURATION JSON DATA: ${err.message}`;
      this.customerconfigEditor.addErrorDecorationFromErr(err);
      return;
    }

    binding = _.merge({}, baseconfig, customerconfig);
    // binding = {};

    try {
      if (this.data.transform !== '') {
        jsonataResult = this.evalJsonata(input, binding);
        this.data.results = jsonataResult;
      }
    } catch (err) {
      this.data.results = err.message || String(err);
      this.jsonataEditor.addErrorDecorationFromErr(err);
    }
    this.editorOverwrite(this.resultsEditor, this.data.results);
  }

  clearMarkers() {
    this.jsonataEditor.clearDecorations();
    this.baseconfigEditor.clearDecorations();
    this.customerconfigEditor.clearDecorations();
    this.jsonEditor.clearDecorations();
  }

  evalJsonata(input, binding) {
    const expr = window.jsonataExtended(this.data.transform);

    // Adding the moment to the expression as it is being referred in reporting transforms.
    // PER-4477
    expr.assign('moment', (arg1, arg2, arg3, arg4) => moment(arg1, arg2, arg3, arg4));

    expr.assign('trace', function (arg) {
      console.log(arg);
    });

    if (!this.local) {
      this.timeboxExpression(expr, 3000, 750);
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
        <MainNav
          sources={this.sources}
          onSourceSelect={this.changeData.bind(this)}
          version={version}
        />
        <Row>
          <Col>
            <Tabs
              defaultActiveKey="transform"
              transition={false}
              id="transform-config"
              onSelect={this.tabsOnSelect}
            >
              <Tab eventKey="transform" title="Transform" className="border">
                <JSONATAEditorWithNav
                  language="jsonata"
                  theme="jsonataTheme"
                  options={options}
                  onChange={this.onChangeExpression.bind(this)}
                  editorDidMount={this.jsonataEditorDidMount.bind(this)}
                  label="Transform"
                  formatEnabled={false}
                />
              </Tab>
              <Tab eventKey="baseconfig" title="Base Configuration" className="border">
                <JSONEditorWithNav
                  language="json"
                  theme="jsonataTheme"
                  options={options}
                  onChange={this.onChangeBaseconfig.bind(this)}
                  editorDidMount={this.baseconfigEditorDidMount.bind(this)}
                  label="Base Configuration"
                />
              </Tab>
              <Tab eventKey="customerconfig" title="Customer Configuration" className="border">
                <JSONEditorWithNav
                  language="json"
                  theme="jsonataTheme"
                  options={options}
                  onChange={this.onChangeCustomerconfig.bind(this)}
                  editorDidMount={this.customerconfigEditorDidMount.bind(this)}
                  label="Customer Configuration"
                />
              </Tab>
            </Tabs>
          </Col>
        </Row>
        <Row>
          <Col>
            <Tabs defaultActiveKey="results" transition={false} id="transform-data">
              <Tab eventKey="source" title="Source Data" className="border">
                <JSONEditorWithNav
                  language="json"
                  theme="jsonataTheme"
                  options={options}
                  onChange={this.onChangeData.bind(this)}
                  editorDidMount={this.jsonEditorDidMount.bind(this)}
                  label="Source Data"
                />
              </Tab>
              <Tab eventKey="results" title="Results" className="border">
                <JSONEditorWithNav
                  language="json"
                  theme="jsonataTheme"
                  options={resultsoptions}
                  editorDidMount={this.resultsEditorDidMount.bind(this)}
                  label="Results"
                  downloadCSVEnabled={true}
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
