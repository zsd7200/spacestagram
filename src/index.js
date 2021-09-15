import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';

// if no api key is found in environment variables, use demo key
const apiKey = process.env.REACT_APP_NASA_API_KEY || 'DEMO_KEY';

// key for localstorage as to not overwrite anything important
const lsKey = "zsdSpacestagram-";

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
		
		// added to lsKey to make a localStorage string
		const lsVar = "likes";
		
		/* eslint-enable no-unused-vars */
		
		// updating the state causes a re-render, so store activeHeart in state
		this.state = { liked: false };
	}
	
	// handle changing icon and storing state in LS
	handleLike = (url) => {
		const json = (JSON.parse(localStorage.getItem(lsKey + this.lsVar))) ? JSON.parse(localStorage.getItem(lsKey + "likes")) : {};
		let tempLike = false;
		
		// swap bool values
		tempLike = !this.state.liked;
		json[url] = tempLike;
		
		localStorage.setItem(lsKey + this.lsVar, JSON.stringify(json));
		console.log(localStorage.getItem(lsKey + this.lsVar));
		this.setState({ liked: tempLike });
	}
	
	// set correct heart on mount and create LS object if necessary
	componentDidMount() {
		const url = this.props.url;
		
		// check if the images is in localStorage and it's liked
		if(localStorage.getItem(lsKey + this.lsVar)) {
			const json = JSON.parse(localStorage.getItem(lsKey + this.lsVar));
			
			// if it exists in the json and is true, change liked to true
			if(json[url]) this.setState({ liked: true });
		}
		// if LS object doesn't exist, set it as an empty object
		else
			localStorage.setItem(lsKey + this.lsVar, JSON.stringify({}));
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

// 

// astronomy picture of the day (APOD) component
class APOD extends React.Component {
	constructor(props) {
		super(props);
		
		// set url for APOD
		this.url = "https://api.nasa.gov/planetary/apod?api_key=";
		
		this.state = {
			err: null,
			loaded: false,
			data: {}
		};
	}
	
	componentDidMount() {
		// fetch APOD data
		fetch(this.url + apiKey)
			.then(res => res.json())
			.then(
				// populate data with result for rendering
				(result) => {
					this.setState({
						loaded: true,
						data: result
					});
				},
				
				// if there's an error, populate error to be displayed
				(error) => {
					this.setState({
						err: error,
						loaded: true
					});
				}
			)
	};
	
	render() {
		// set for easier access
		const { err, loaded, data } = this.state;
		
		if(err) return <ErrorDisplay message={err.message} />
		else if (!loaded) return <Loading />;
		else {
			console.log(data);
			return (
				<div id="apod-container">
					<img id="apod-pic" src={data.url} alt={data.title} />
					<h2 id="apod-title">
						<span className="tooltip" 
							  title="Astronomy Pictue Of the Day">
							  
							  APOD:</span> {data.title}
					</h2>
					<p id="apoc-date">{handleDate(data.date)}</p>
					<p id="apoc-desc">{data.explanation}</p>
					<LikeButton url={data.url} />
				</div>
			);
		}
	}
};

// main App component, loads everything
class App extends React.Component {
	render() {
		return (
			<>
				<header>
					<h1>Spacestagram <i className="fas fa-rocket"></i></h1>
				</header>
				
				<APOD />
			</>
		);
	}
};

ReactDOM.render(
	<App />,
	document.getElementById("root")
);