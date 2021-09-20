// index.js - Handles displaying to ReactDOM and importing CSS files

import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import App from './router';

ReactDOM.render(
	<App />,
	document.getElementById("root")
);