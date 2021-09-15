// index.js - Main app component. Also handles displaying the page with ReactDOM.

import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import { lsKey } from './helpers'
import { APOD } from './apod';
import { Curiosity } from './curiosity';

// main App component, loads everything
class App extends React.Component {
	componentDidMount() {
		// set an empty object as localStorage json if it doesn't exist upon loading 
		if(!localStorage.getItem(lsKey))
			localStorage.setItem(lsKey, JSON.stringify({}));
		
		console.log(localStorage.getItem(lsKey));
	};
	
	render() {
		return (
			<>
				<header>
					<h1>Spacestagram <i className="fas fa-rocket"></i></h1>
				</header>
				
				<APOD />
				
				<Curiosity />
			</>
		);
	}
};

ReactDOM.render(
	<App />,
	document.getElementById("root")
);