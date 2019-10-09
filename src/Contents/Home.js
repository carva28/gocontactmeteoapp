import React, { Component } from 'react';
import NavBar from './NavBar';
import Selecidades from './SelecionarCidades';
export default class Home extends React.Component {
    constructor(props) {
      super(props);
        
      
    }
  
    
    render() {
      return (
        <div>
            <NavBar />
            <Selecidades />
        </div>
      );
    }
  }
