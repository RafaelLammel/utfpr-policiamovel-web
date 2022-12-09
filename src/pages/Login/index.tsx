import React, {useContext, useState} from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import {LoginRequest} from "../../interfaces/requests/LoginRequest";
import {ErrorResponse} from "../../interfaces/responses/ErrorResponse";
import AuthContext from "../../contexts/auth";
import {validateLoginOrCreateUserRequest} from "../../validators/LoginRequestValidator";

import "./styles.css";

export default function LoginPage() {

    const { signIn } = useContext(AuthContext);

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: any) => {

        e.preventDefault();

        const loginRequest: LoginRequest = {
            login: login.trim(),
            password: password.trim(),
        };

        if (!validateLoginOrCreateUserRequest(loginRequest)) {
            return;
        }

        const res = await signIn(loginRequest);

        if (res === null) {
            return;
        }

        const errors = res as ErrorResponse;

        alert('Erros durante o Login\n' + errors.errorMsgs.join('\n'));
    }

    return (
        <Card className="form-card">
            <Card.Header as="h1">
                Polícia Movel
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Login</Form.Label>
                        <Form.Control value={login} onChange={(e: any) => setLogin(e.target.value)} type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control value={password} onChange={(e: any) => setPassword(e.target.value)} type="password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Entrar
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}
