import React, { Fragment,Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Formulario from '../Form/Form.js';
import Home from './Home';
export default class AppRoute extends Component {
  render() {
    return (
        <Router>
        <div className="App">
          
  
          <Route path='/' exact strict component={Formulario} />
          <Route path='/home' component={Home} />
        </div>
      </Router>
    )
  }
}
