# Spacestagram
by zsd7200

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Install
### `npm i`

## Run Local Server
### `npm start`

The server will now be available at [http://localhost:3000](http://localhost:3000).

## Other Notes
A [NASA API Key](https://api.nasa.gov/) can be applied to the project, but is not entirely necessary. 

If you wish to apply your API Key, create a file called `.env` in the project's root directory, and 
paste this line: `REACT_APP_NASA_API_KEY=""`, placing your API key in the quotations.

An example of a properly set up `.env` file might look something like this: `REACT_APP_NASA_API_KEY="87sdf9shdf98sd6hsef89efhbfw5e465bnjbasf8"`.

If a key is not provided, `DEMO_KEY` will be used.



If you're experiencing issues, try clearing your localStorage. Open the console and type 
`localStorage.clear();` and press enter. If it returns undefined, your localStorage is now 
clear and the project should work again.