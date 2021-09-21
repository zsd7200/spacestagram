// darkmode.js - Handles everything to do with dark mode.

import React from 'react';

class LightToggle extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { darkMode: true };
		this.lsKey = "zsdSpacestagram-lightMode";
	}
	
	componentDidMount() {
		// if lsKey isn't null, also check if it returns false
		// that way light mode can be handled on page load
		if(localStorage.getItem(this.lsKey) !== null) {
			if(localStorage.getItem(this.lsKey) === 'false') {
				this.handleLight();
			}
		} else {
			localStorage.setItem(this.lsKey, this.state.darkMode); // otherwise store true (default)
		}
	}
	
	handleLight = () => {
		let filteredArr, arr = [];
		
		// push dom elements that need to be changed
		// to arr
		arr.push(document.querySelector('body'));
		arr.push(document.querySelector('#title'));
		arr.push(document.querySelector('#dark-toggle-button'));
		arr.push(document.querySelector('#return-home'));
		arr.push(document.querySelector('#loading-container'));
		arr = arr.concat(Array.from(document.querySelectorAll('.like-button')));
		arr = arr.concat(Array.from(document.querySelectorAll('.share-button')));
		arr = arr.concat(Array.from(document.querySelectorAll('.single-img-container')));
		arr = arr.concat(Array.from(document.querySelectorAll('.rover-pic-container')));

		// filter out null objects
		filteredArr = arr.filter((item) => { return item !== null; });
		
		// toggle light mode
		for(let i = 0; i < filteredArr.length; i++) {
			filteredArr[i].classList.toggle('light-mode');
		}
		
		// setState to change button to appropriate icon
		this.setState({ darkMode: !this.state.darkMode });
		localStorage.setItem(this.lsKey, !this.state.darkMode);
	}
	
	render() {
		// show sun if in dark mode, moon if in light mode
		if(this.state.darkMode)
			return <button id="dark-toggle-button" onClick={this.handleLight}><i className="fas fa-sun"></i></button>
		else
			return <button id="dark-toggle-button" onClick={this.handleLight}><i className="fas fa-moon"></i></button>

	}
};

export { LightToggle };