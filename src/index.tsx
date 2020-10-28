import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import ConfigProvider from 'antd/lib/config-provider';
import en_US from 'antd/lib/locale/en_US';

ReactDOM.render(
  // <React.StrictMode>
  <ConfigProvider locale={en_US}>
    <App />
  </ConfigProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
