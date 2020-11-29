import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const root = document.getElementById('root');

const ProviderElement = React.createElement(App, {});
ReactDOM.render(ProviderElement, root);
