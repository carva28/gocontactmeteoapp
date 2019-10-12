import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

export default class Formulario extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nome_user: '',
            password: '',
            home: false
        };
    }

    handleChange = (event) => {
        this.setState({ nome_user: event.target.value });
    }
    handleChange2 = (event) => {
        this.setState({ password: event.target.value });
    }


    verificaLogin = () => {
        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.nome_user,
                password: this.state.password
            })
        }, 5000)
            .then((response) => response.json())
            .then((res) => {

                if (res.message === 'Success') {
                    this.setState({
                        home: true
                    })
                } else {
                    return (
                        <h2>Utilizador Inválido</h2>
                    );
                }
            })
    }

    render() {
        if (this.state.home === false) {
            return (
                <Form>

                    <h2 id="title">Meteorologia</h2>
                    <FormGroup className="main">
                        <FormGroup >
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" id="exampleEmail" value={this.state.nome_user} placeholder="Coloque o sue email" onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" id="examplePassword" value={this.state.password} placeholder="Palavra-passe" onChange={this.handleChange2} />
                        </FormGroup>

                        <Button color="secondary" size="md" id="btn_form" onClick={this.verificaLogin}>
                            <p style={{ color: 'black' }}>Login</p>
                            {/* <Link to="/home">Login</Link> */}
                        </Button>

                    </FormGroup>
                </Form>
            )
        } else if (this.state.home === true) {
            return (<Redirect to={{ pathname: '/home', }} />);
        }

    }
}
