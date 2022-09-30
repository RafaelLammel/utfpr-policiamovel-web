import React, {useContext, useState} from "react";
import {LoginRequest} from "../../interfaces/requests/LoginRequest";
import './styles.css';
import {ErrorResponse} from "../../interfaces/responses/ErrorResponse";
import AuthContext from "../../contexts/auth";
import './styles.css';
import {validateLoginOrCreateUserRequest} from "../../validators/LoginRequestValidator";

export default function LoginPage() {

    const { signIn } = useContext(AuthContext);

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const validateLoginRequest = (loginRequest: LoginRequest): boolean => {
        const errors: string[] = [];

        if (loginRequest.login === '' || loginRequest.login === null) {
            errors.push('Login é obrigatório!');
        }

        if (loginRequest.password === '' || loginRequest.password === null) {
            errors.push('Senha é obrigatória!');
        }

        if (errors.length === 0) {
            return true;
        }

        alert('Erros durante o Login:\n' + errors.join('\n'));
        return false;
    };

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
        <div className="card">
            <h1>Polícia Movel</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="login">Login</label>
                    <input type="text" value={login} onChange={(e: any) => setLogin(e.target.value)} id="login" />
                </div>
                <div>
                    <label htmlFor="password">Senha</label>
                    <input type="password" value={password} onChange={(e: any) => setPassword(e.target.value)} id="password" />
                </div>
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}
