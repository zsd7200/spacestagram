// home.js - landing/index page, also handles initializing localStorage if necessary

import React from 'react';
import './css/main.css';
import { lsKey, Header } from './helpers'
import { APOD } from './apod';
import { Curiosity } from './curiosity';

// main Home component, loads everything
class Home extends React.Component {
	componentDidMount() {
		// set an empty object as localStorage json if it doesn't exist upon loading 
		if(!localStorage.getItem(lsKey))
			localStorage.setItem(lsKey, JSON.stringify({}));
	};
	
	render() {
		return (
			<>
				<Header />
				
				<APOD />
				
				<Curiosity />
			</>
		);
	}
};

export { Home };