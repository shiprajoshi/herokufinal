import React from 'react';
import { Router, Route } from 'react-router';

import Main from './Main';
import ErrorNotFound from './ErrorNotFound';

/**
 * The React Router 1.0 routes for both the server and the client.
 */
module.exports = (
	<Router>
		<Route path="/" component={Main} />
		<Route path="*" component={ErrorNotFound} />
	</Router>
);
