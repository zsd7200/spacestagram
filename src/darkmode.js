// darkmode.js - Handles everything to do with dark mode.

import { createGlobalStyle } from 'styled-components';

export const lightBody = {
	background: 'white',
	text: 'black',
};

export const darkBody = {
	background: '#2b2b36',
	color: '#f2f2f2',
};

export const GlobalStyles = createGlobalStyle`
	body {
		background: ${lightBody.background};
		color: ${lightBody.color};
	}
`