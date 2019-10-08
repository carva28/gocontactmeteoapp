import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Formulario extends Component {
    render() {
        return (
            <Form>

                <h2 id="title">Meteorologia</h2>
                <FormGroup className="main">
                    <FormGroup >
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="Coloque o sue email" />
                    </FormGroup>

                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="Palavra-passe" />
                    </FormGroup>

                    <Button color="secondary" size="lg" id="btn_form">
                        <Link to="/home">Login</Link>
                    </Button>
                    
                </FormGroup>
            </Form>
        )
    }
}
