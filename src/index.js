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
import Comp12 from './pages/12';
import Comp13 from './pages/13';
import Comp14 from './pages/14';
import Comp15 from './pages/15';
import Comp16 from './pages/16';
import Comp17 from './pages/17';
import Comp18 from './pages/18';
import Comp19 from './pages/19';
import Comp20 from './pages/20';
import Comp21 from './pages/21';
import Comp22 from './pages/22';
import Comp23 from './pages/23';
import Comp24 from './pages/24';
import Comp25 from './pages/25';
import Comp26 from './pages/26';

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
        <Route path="/12" component={Comp12} />
        <Route path="/13" component={Comp13} />
        <Route path="/14" component={Comp14} />
        <Route path="/15" component={Comp15} />
        <Route path="/16" component={Comp16} />
        <Route path="/17" component={Comp17} />
        <Route path="/18" component={Comp18} />
        <Route path="/19" component={Comp19} />
        <Route path="/20" component={Comp20} />
        <Route path="/21" component={Comp21} />
        <Route path="/22" component={Comp22} />
        <Route path="/23" component={Comp23} />
        <Route path="/24" component={Comp24} />
        <Route path="/25" component={Comp25} />
        <Route path="/26" component={Comp26} />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
