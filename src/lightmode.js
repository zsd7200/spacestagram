// darkmode.js - Handles everything to do with dark mode.

import React from 'react';

const lsKey = "zsdSpacestagram-lightMode";

// method gets exported to be used in other components, lets them
// know whether or not to append light-mode
let isDark = () => {
	if(localStorage.getItem(lsKey) !== null) {
		if(localStorage.getItem(lsKey) === 'false') {
			return false;
		}
	}
	return true;
};

class LightToggle extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { darkMode: true };
	}
	
	componentDidMount() {
		// if lsKey isn't null, also check if it returns false
		// that way light mode can be handled on page load
		if(localStorage.getItem(lsKey) !== null) {
			if(localStorage.getItem(lsKey) === 'false') {
				window.onload = this.handleLight;
			}
		} else {
			localStorage.setItem(lsKey, this.state.darkMode); // otherwise store true (default)
		}
	}
	
	handleLight = () => {
		let filteredArr, arr = [];
		let toggleButton = document.querySelector('#light-toggle-button');
		let roverPics = Array.from(document.querySelectorAll('.rover-pic-container'));
		console.log(roverPics);
		
		// check if disabled, will prevent rest of func from firing
		if(toggleButton.disabled)
			return false;
		
		// push dom elements that need to be changed
		// to arr
		arr.push(document.querySelector('body'));
		arr.push(document.querySelector('#title'));
		arr.push(toggleButton);
		arr.push(document.querySelector('#return-home'));
		arr.push(document.querySelector('#loading-container'));
		arr.push(document.querySelector('#single-img-container'));
		arr = arr.concat(Array.from(document.querySelectorAll('.rover-pic-container')));

		// filter out null objects
		filteredArr = arr.filter((item) => { return item !== null; });
		
		// toggle light mode
		for(let i = 0; i < filteredArr.length; i++) {
			filteredArr[i].classList.toggle('light-mode');
		}
		
		// button transition anim and localStorage set
		toggleButton.disabled = true;
		toggleButton.children[0].classList.add('toggle-anim');
		localStorage.setItem(lsKey, !this.state.darkMode);
		
		// element becomes invisible from 30% to 40% of a 1s anim, so 
		// 350 ms is perfect to swap fa-sun with fa-moon and vice versa
		setTimeout(() => {
			if(Array.from(toggleButton.children[0].classList).includes("fa-sun")) {
				toggleButton.children[0].classList.remove("fa-sun");
				toggleButton.children[0].classList.add("fa-moon");
			} else {
				toggleButton.children[0].classList.remove("fa-moon");
				toggleButton.children[0].classList.add("fa-sun");
			}
		}, 350);

		// make sure animation is done before enabling button and 
		// rerendering with setState
		setTimeout(() => {
			toggleButton.disabled = false;
			this.setState({ darkMode: !this.state.darkMode });
		}, 1000);

	}
	
	render() {
		// show sun if in dark mode, moon if in light mode
		if(this.state.darkMode)
			return <button id="light-toggle-button" onClick={this.handleLight}><i className="fas fa-sun"></i></button>
		else
			return <button id="light-toggle-button" onClick={this.handleLight}><i className="fas fa-moon"></i></button>

	}
};

export { isDark, LightToggle };