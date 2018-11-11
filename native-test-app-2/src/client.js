import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {ViewerScriptWrapper} from 'native-components-infra';
import viewerScript from './viewerScript';
import _ from 'lodash';

const options = {
  viewerScript: viewerScript,
  widgetConfig: {},
  Wix: _.assign(window.Wix, {getSiteInfo: (cb) => cb({})}),
  overrides: {

  }
};

const WrapperComponent = ViewerScriptWrapper(App.component, options);

ReactDOM.render(<WrapperComponent />, document.getElementById('root'));
