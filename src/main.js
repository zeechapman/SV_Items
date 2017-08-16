import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import * as firebase from 'firebase';
import './sass/main.scss';

import config from './configure.js'; // Shhhhh this is not here...


firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('app'));