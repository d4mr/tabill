import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import './index.css';

// import Auth from './layouts/Auth/Auth.js';
import Home from './layouts/Home/Home.js';
import Game from './layouts/Game/Game.js';

import AppProviders from './providers/context.js';

ReactDOM.render(
    <AppProviders>
        <Router>
            <Switch>
                {/* <Route path="/auth/" render={(props) => <Auth />} /> */}
                <Route path="/" exact render={(props) => <Home />} />
                <Route path="/game" exact render={(props) => <Game />} />
                <Route path="/" render={(props) => <Redirect to="/" />} />
            </Switch>
        </Router>
    </AppProviders>,
    document.getElementById('root')
);
reportWebVitals(console.log);
