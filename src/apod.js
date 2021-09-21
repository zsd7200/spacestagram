// apod.js - Component for displaying the Astronomy Picture of the Day (APOD).

import React from 'react';
import {
	apiKey,
	handleDate,
	Loading,
	ErrorDisplay,
	Buttons
} from './helpers';

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
				return (
					<div className="single-img-container">
						<div className="single-img">
							<iframe id="apod-video" src={data.url} title={data.title}></iframe>
						</div>
						<div className="single-data">
							<h1 id="apod-title">
								<span className="help" 
									  title="Astronomy Picture Of the Day">
									  
									  APOD:</span> {data.title}
							</h1>
							<p id="apod-date" className="help" title={handleDate(data.date)}>{data.date}</p>
							<p id="apod-desc">{data.explanation}</p>
							<Buttons url={data.url} type="apod" />
						</div>
					</div>
				);
			} else {
				// otherwise just display an <img>
				return (
					<div className="single-img-container">
						<div className="single-img">
							<img id="apod-pic" src={data.url} alt={data.title} />
						</div>
						<div className="single-data">
							<h1 id="apod-title">
								<span className="help" 
									  title="Astronomy Picture Of the Day">
									  
									  APOD:</span> {data.title}
							</h1>
							<p id="apod-date" className="help" title={handleDate(data.date)}>{data.date}</p>
							<p id="apod-desc">{data.explanation}</p>
							<Buttons url={data.url} type="apod" />
						</div>
					</div>
				);
			}
		}
	};
};

export { APOD };