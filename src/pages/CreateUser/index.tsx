import React, {useState} from 'react';
import {ErrorResponse} from "../../interfaces/responses/ErrorResponse";
import {validateLoginOrCreateUserRequest} from "../../validators/LoginRequestValidator";
import {createUser} from "../../services/api";
import {CreateUserRequest} from "../../interfaces/requests/CreateUserRequest";
import LoadingComponent from "../../components/Loading";
import './styles.css';

export default function CreateUserPage() {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
            <div className="card">
                <h1>Cadastro de Usuário</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="login">Login</label>
                        <input type="text" value={login} onChange={(e: any) => setLogin(e.target.value)} id="login" />
                    </div>
                    <div>
                        <label htmlFor="password">Senha</label>
                        <input type="password" value={password} onChange={(e: any) => setPassword(e.target.value)} id="password" />
                    </div>
                    <input disabled={isLoading} type="submit" value="Cadastrar" />
                </form>
            </div>
        </div>
    )

}