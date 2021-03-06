// helpers.js - Store variables/functions used across multiple components.

import React from 'react';
import { LightToggle } from './lightmode';

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

// loading, err display, header, notfoundcomponents
class Loading extends React.Component {
	render() { return <div id="loading-container"><div id="lds-ring"><div></div></div></div>; }
};

// takes props:
// message
class ErrorDisplay extends React.Component {	
	render() { return <div id="err-disp">Error: {this.props.message}</div>; }
};

// displayed at the top of every page
class Header extends React.Component {
	render() {
		return ( 
			<header>
				<h1 id="title">
					<a href="/">Spacestagram <i className="fas fa-rocket"></i></a>
				</h1>
				<LightToggle />
			</header>
		);
	}
};

// displayed if incorrect page is reached
class NotFound extends React.Component {
	render() { 
		return (
			<div id="not-found">
				<h1>Page Not Found</h1>
				<h2 id="return-home"><a href="/">Click here to return home.</a></h2>
			</div>
		);
	}
};

// displayed at the end of all shown images
class EndMessage extends React.Component {
	render() {
		return (
			<div id="end-of-page">
				<h3>Looks like you've reached the end of the page!</h3>
				<h4>Hope you had fun, see you again soon!</h4>
				<h4><i className="fas fa-heart"></i></h4>
			</div>
		);
	}
}

// takes props:
// url
class LikeButton extends React.Component {
	constructor(props) {
		super(props);
		
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

// takes props:
// type ("apod" or "curiosity")
// id (only taken from curiosity images)
class ShareButton extends React.Component {
	// links are generated differently based on type of image
	render() {
		switch(this.props.type) {
			
			// apod always just goes to /apod
			case "apod":
				return (
					<button className="share-button">
						<a href="/apod">
							<i className="fas fa-share-square"></i>
						</a>
					</button>
				);
			
			// curiosity passes in the prop "id" to a query parameter
			// page shows the correct image based on that param
			case "curiosity":
				return (
					<button className="share-button">
						<a href={"/curiosity?id=" + this.props.id}>
							<i className="fas fa-share-square"></i>
						</a>
					</button>
				);
			
			// shouldn't happen unless I made some kind of mistake
			default:
				return <ErrorDisplay message="Incorrect share button type. If you are seeing this, please contact zsd7200@rit.edu" />;
		}
	}
};

// button container, holds both like and share
// takes props:
// url (for like)
// type ("apod" or "curiosity", for share)
// id (only taken from curiosity, for share)
class Buttons extends React.Component {
	render() {
		return (
			<div className="button-container">
				<LikeButton url={this.props.url} />
				<ShareButton type={this.props.type}	id={this.props.id} />
			</div>
		);
	}
}

export { apiKey, lsKey, handleDate, Loading, ErrorDisplay, 
		 Header, NotFound, EndMessage, Buttons };