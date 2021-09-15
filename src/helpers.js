// helpers.js - Store variables/functions used across multiple components.

import React from 'react';
import './css/main.css';

// if no api key is found in environment variables, use demo key
const apiKey = process.env.REACT_APP_NASA_API_KEY || 'DEMO_KEY';

// key for localstorage as to not overwrite anything important
const lsKey = "zsdSpacestagram-likes";

// takes a date in (yyyy-mm-dd) and converts it to (month name dd, yyyy)
let handleDate = (date) => {
	const dateArr = date.split('-');
	
	// try to convert, but if there's an error, print it
	// to the console and return the passed in date
	try {
		// dateArr[1] needs to be subtracted by 1 because Date 
		// goes from 0-11 for months instead of 1-12
		const dateObj = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
		return dateObj.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
	}
	catch(err) {
		console.log("HANDLEDATE ERROR: " + err.message);
		return date;
	}
};

// loading and err display components
class Loading extends React.Component {
	render() { return <div id="lds-ring"><div></div></div>; }
};

// takes props:
// message
class ErrorDisplay extends React.Component {	
	render() { return <div id="err-disp">Error: {this.props.message}</div>; }
};

// takes props:
// url
class LikeButton extends React.Component {
	constructor(props) {
		super(props);
		
		// disable no-unused-vars here because they're used later
		/* eslint-disable no-unused-vars */
		
		// these are classnames that can be applied
		// to <i> elements to show fontawesome icons
		const fullHeart = "fas fa-heart";
		const emptyHeart = "far fa-heart";
		
		/* eslint-enable no-unused-vars */
		
		// updating the state causes a re-render, so store activeHeart in state
		this.state = { liked: false };
	}
	
	// handle changing icon and storing state in LS
	handleLike = (url) => {
		const json = JSON.parse(localStorage.getItem(lsKey));
		let tempLike = false;
		
		// instead of storing whole URL, store just the
		// image title to save splace in localStorage
		let splitUrl = url.split('/');
		const imgTitle = splitUrl[splitUrl.length - 1];
		
		// swap bool values, this also creates the entry the json
		// that gets sent back to localStorage
		tempLike = !this.state.liked;
		json[imgTitle] = tempLike;
		
		localStorage.setItem(lsKey, JSON.stringify(json));
		this.setState({ liked: tempLike });
	}
	
	// set correct heart on mount and create LS object if necessary
	componentDidMount() {
		const url = this.props.url;
		
		// check if the images is in localStorage and it's liked
		if (localStorage.getItem(lsKey)) {
			const json = JSON.parse(localStorage.getItem(lsKey));
			let splitUrl = url.split('/');
			const imgTitle = splitUrl[splitUrl.length - 1];
			
			// if it exists in the json and is true, change liked to true
			if(json[imgTitle]) this.setState({ liked: true });
		}
		// if LS object doesn't exist, set it as an empty object
		else
			localStorage.setItem(lsKey, JSON.stringify({}));
	}
	
	// render different hearts based on liked state
	render() {
		if(this.state.liked) {
			return (
				<button className="like-button liked" onClick={() => this.handleLike(this.props.url)}>
					<i className="fas fa-heart"></i>
				</button>
			);
		} else {
			return (
				<button className="like-button unliked" onClick={() => this.handleLike(this.props.url)}>
					<i className="far fa-heart"></i>
				</button>
			);
		}
	}
};

export { apiKey, lsKey, handleDate, Loading, ErrorDisplay, LikeButton };