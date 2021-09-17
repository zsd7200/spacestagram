// router.js - Handle incorrect URLs and links to share specific posts

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Header, NotFound } from './helpers';
import { Home } from './home';
import { APOD } from './apod';
import { Curiosity } from './curiosity';

export default function RouteApp() {
	// get curiosity id from query params
	const urlSearchParams = new URLSearchParams(window.location.search);
	const curiosityId = Object.fromEntries(urlSearchParams.entries()).id;
	
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				
				<Route path="/apod">
					<Header />
					<APOD />
				</Route>
				
				<Route path="/curiosity">
					<Header />
					<Curiosity id={curiosityId} />
				</Route>
				
				<Route path="">
					<Header />
					<NotFound />
				</Route>
			</Switch>
		</Router>
	);
}