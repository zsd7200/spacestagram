// curiosity.js - Component for displaying pictures from the Mars rover named Curiosity.

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
// json (which has these values: id, sol, camera{id, name, rover_id, full_name}, 
// img_src, earth_date, rover{id, name, landing_date, launch_date, status})
// single (bool, whether or not the pic is on its own page)
// key - index in map (optional)
// css (optional, used for light mode in single-image mode)
// creates a container for a single picture, gets mapped in Curiosity
class CuriosityPicture extends React.Component {
	// func to compile title for curiosity pics since
	// there isn't a built-in name
	handleTitle = (name, camName, id) => {
		let retStr = name + " - ";
		retStr += camName + " - ";
		retStr += "ID: " + id;
		return retStr;
	};
	
	// create title and return a container
	render() {
		const title = this.handleTitle(this.props.json.rover.name, 
									   this.props.json.camera.full_name, 
									   this.props.json.id);

		// check if it's a single image/on its own page, or if it's on the home page with others
		if(this.props.single) {
			return (
				<div id="single-img-container" className={this.props.css}>
					<div id="single-img">
						<img className="rover-pic" src={this.props.json.img_src} alt={title} />
					</div>
					<div id="single-data">
						<h1 className="rover-title">{title}</h1>
						<p className="rover-date help" title={handleDate(this.props.json.earth_date)}>{this.props.json.earth_date}</p>
						<Buttons url={this.props.json.img_src} type="curiosity" id={this.props.json.id}/>
					</div>
				</div>
			);
		} else {
			// compile names of classes with css prop
			const cssName = (this.props.css) ? "rover-pic-container " + this.props.css : "rover-pic-container";
			
			return (
				<div className={cssName}>
					<img className="rover-pic" src={this.props.json.img_src} alt={title} />
					<h2 className="rover-title">{title}</h2>
					<p className="rover-date help" title={handleDate(this.props.json.earth_date)}>{this.props.json.earth_date}</p>
					<Buttons url={this.props.json.img_src} type="curiosity" id={this.props.json.id}/>
				</div>
			);
		}
	};
};

// displays all curiosity pics loaded in (25, since just the first page)
// takes props:
// id
class Curiosity extends React.Component {
	constructor(props) {
		super(props);
		
		// set url for curiosity pics
		this.url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=";
		
		this.state = {
			err: null,
			loaded: false,
			data: {}
		};
	};
	
	componentDidMount() {
		// fetch curiosity data
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
		
		// if error display the error, if loading display loading
		// component until loaded
		if(err) return <ErrorDisplay message={err.message} />
		else if (!loaded) return <Loading />;
		else {
			// if fed an ID through a query param, only show that
			// specific image
			if(this.props.id) {
				let json = {};
				
				// copy the correct json data to pass through to CuriosityPicture
				for(let i = 0; i < data.photos.length; i++) {
					console.log(data.photos[i].id);
					if(parseInt(this.props.id) === data.photos[i].id) {
						json = data.photos[i];
						break;
					}
				}
				
				// check if light mode is active
				if(!isDark())
					return <CuriosityPicture json={json} single={true} css={"light-mode"} />;
				
				return <CuriosityPicture json={json} single={true} />;
				
			} else {
				// otherwise (no query param), show all pictures
				return (
					<div id="curiosity-container">
						{data.photos.map((item, index) => {
							// check if light mode is active
							if(!isDark())
								return <CuriosityPicture json={item} single={false} key={index} css={"light-mode"} />;
								
							
							return <CuriosityPicture json={item} single={false} key={index} />;
						})}
					</div>
				);
			}
		}
	};
};

export { Curiosity };