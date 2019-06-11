import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import './App.css';

import { Provider } from 'react-redux';
import configureStore from "./store";
const store = configureStore();

ReactDOM.render(<Provider store={store}><App /></Provider>,
document.getElementById('root'));