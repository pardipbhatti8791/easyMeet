import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { icons } from './assets/icons';
// `import 'semantic-ui-css/semantic.min.css';
// import './scss/style.scss'

React.icons = icons;

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
