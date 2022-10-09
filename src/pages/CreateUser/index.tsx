import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import {ErrorResponse} from "../../interfaces/responses/ErrorResponse";
import {validateLoginOrCreateUserRequest} from "../../validators/LoginRequestValidator";
import {createUser} from "../../services/api";
import {CreateUserRequest} from "../../interfaces/requests/CreateUserRequest";
import LoadingComponent from "../../components/Loading";

import "./styles.css";

export default function CreateUserPage() {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {

        e.preventDefault();

        setIsLoading(true);

        const createUserRequest: CreateUserRequest = {
            login: login.trim(),
            password: password.trim(),
        };

        if (!validateLoginOrCreateUserRequest(createUserRequest)) {
            return;
        }

        const res = await createUser(createUserRequest);

        setIsLoading(false);

        if (res === 201) {
            alert('Usuário criado com sucesso!');
            setLogin("");
            setPassword("");
            return;
        }

        const errors = res as ErrorResponse;

        alert('Erros durante a criação de usuário\n' + errors.errorMsgs.join('\n'));
    }

    return (
        <div>
            {isLoading ?
                <div className="loading">
                    <LoadingComponent/>
                </div>
                : <></>}
            <Card style={{width: '28rem'}}>
                <Card.Header as="h1">
                    Cadastrar Usuário
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
                        <Container>
                            <Row>
                                <Col style={{padding: 0}}>
                                    <Button variant="secondary" disabled={isLoading} onClick={() => navigate('/')}>
                                        Voltar
                                    </Button>
                                </Col>
                                <Col style={{padding: 0, textAlign: 'right'}}>
                                    <Button variant="primary" type="submit" disabled={isLoading}>
                                        Cadastrar
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )

}