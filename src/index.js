import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import './index.css';

import App from './pages/app/App';
import Comp1 from './pages/1';
// import Comp2 from './pages/2';

console.log(this)

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>

        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/app" component={App} />
        <Route path="/1" component={Comp1} />
        {/* <Route path="/2" component={Comp2} /> */}
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
