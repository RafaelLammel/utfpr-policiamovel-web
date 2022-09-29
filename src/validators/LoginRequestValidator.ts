import {LoginRequest} from "../interfaces/requests/LoginRequest";
import {CreateUserRequest} from "../interfaces/requests/CreateUserRequest";

export const validateLoginOrCreateUserRequest = (request: LoginRequest | CreateUserRequest): boolean => {
    const errors: string[] = [];

    if (request.login === '' || request.login === null) {
        errors.push('Login é obrigatório!');
    }

    if (request.password === '' || request.password === null) {
        errors.push('Senha é obrigatória!');
    }

    if (errors.length === 0) {
        return true;
    }

    alert('Erros durante a operação:\n' + errors.join('\n'));
    return false;
};