import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import './index.css';

import App from './pages/app/App';
import Comp1 from './pages/1';
import Comp2 from './pages/2';
import Comp3 from './pages/3';
import Comp4 from './pages/4';
import Comp5 from './pages/5';
import Comp6 from './pages/6';
import Comp7 from './pages/7';
import Comp8 from './pages/8';
import Comp9 from './pages/9';
import Comp10 from './pages/10';
import Comp11 from './pages/11';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/app" component={App} />
        <Route path="/1" component={Comp1} />
        <Route path="/2" component={Comp2} />
        <Route path="/3" component={Comp3} />
        <Route path="/4" component={Comp4} />
        <Route path="/5" component={Comp5} />
        <Route path="/6" component={Comp6} />
        <Route path="/7" component={Comp7} />
        <Route path="/8" component={Comp8} />
        <Route path="/9" component={Comp9} />
        <Route path="/10" component={Comp10} />
        <Route path="/11" component={Comp11} />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
