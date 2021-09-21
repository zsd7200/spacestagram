// apod.js - Component for displaying the Astronomy Picture of the Day (APOD).

import React from 'react';
import {
	apiKey,
	handleDate,
	Loading,
	ErrorDisplay,
	Buttons
} from './helpers';
import { isDark } from './lightmode';

// takes props:
// json (url, title, date, explanation)
// css (optional, used if light mode needs to be passed in)
class APODVideo extends React.Component {
	render() {
		return (
			<div id="single-img-container" className={this.props.css}>
				<div id="single-img">
					<iframe id="apod-video" src={this.props.json.url} title={this.props.json.title}></iframe>
				</div>
				<div id="single-data">
					<h1 id="apod-title">
						<span className="help" 
							  title="Astronomy Picture Of the Day">
							  
							  APOD:</span> {this.props.json.title}
					</h1>
					<p id="apod-date" className="help" title={handleDate(this.props.json.date)}>{this.props.json.date}</p>
					<p id="apod-desc">{this.props.json.explanation}</p>
					<Buttons url={this.props.json.url} type="apod" />
				</div>
			</div>
		);
	}
}

// takes props:
// json (url, title, date, explanation)
// css (optional, used if light mode needs to be passed in)
class APODPicture extends React.Component {
	render() {
		return (
			<div id="single-img-container" className={this.props.css}>
				<div id="single-img">
					<img id="apod-pic" src={this.props.json.url} alt={this.props.json.title} />
				</div>
				<div id="single-data">
					<h1 id="apod-title">
						<span className="help" 
							  title="Astronomy Picture Of the Day">
							  
							  APOD:</span> {this.props.json.title}
					</h1>
					<p id="apod-date" className="help" title={handleDate(this.props.json.date)}>{this.props.json.date}</p>
					<p id="apod-desc">{this.props.json.explanation}</p>
					<Buttons url={this.props.json.url} type="apod" />
				</div>
			</div>
		);
	}
}

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
	};
	
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
			// handle if apod is a youtube video by placing it in an iframe
			if(data.url.indexOf("youtube") > -1) {
				
				// check if light mode is active
				if(!isDark())
					return <APODVideo json={data} css={"light-mode"} />;
				
				return <APODVideo json={data} />;
				
			} else {
				// otherwise just display an <img>
				
				// check if light mode is active
				if(!isDark())
					return <APODPicture json={data} css={"light-mode"} />;
				
				return <APODPicture json={data} />;
			}
		}
	};
};

export { APOD };