import axios, { AxiosError } from 'axios';
import { LoginRequest } from '../interfaces/requests/LoginRequest';
import { LoginResponse } from '../interfaces/responses/LoginResponse';
import { ErrorResponse } from '../interfaces/responses/ErrorResponse';
import { CreateUserRequest } from "../interfaces/requests/CreateUserRequest";
import { LocationsResponse } from '../interfaces/responses/LocationsResponse';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export async function login(
  loginRequest: LoginRequest,
): Promise<LoginResponse | ErrorResponse> {
  try {
    const response = await api.post(
      '/api/v1/authentication/login',
      loginRequest,
    );

    return response.data as LoginResponse;
  } catch (error) {
    const e = error as AxiosError;

    if (e.response?.status === 500) {
      return {
        errorMsgs: ['Algo deu errado no servidor! Tente novamente mais tarde'],
        cod: e.response?.status
      };
    } if (e.response?.status === 404) {
      return {
        errorMsgs: ['Login ou senha incorretos!'],
        cod: e.response?.status
      };
    }

    const errorResponse: ErrorResponse = {
      errorMsgs: [],
    } as ErrorResponse;
    const errors: any = e.response?.data;

    Object.values(errors.errors).forEach(value => {
      const errorList = value as string[];
      errorList.forEach(v => errorResponse.errorMsgs.push(v));
    });

    return errorResponse;
  }
}

export async function createUser(
  createUserRequest: CreateUserRequest
): Promise<number | string | ErrorResponse> {
  try {
    const response = await api.post('/api/v1/User', createUserRequest, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("@auth:token")
      }
    });

    return response.status;
  } catch (error) {
    const e = error as AxiosError;

    if (e.response?.status === 500) {
      return {
        errorMsgs: ['Algo deu errado no servidor! Tente novamente mais tarde'],
        cod: e.response?.status
      };
    }
    if (e.response?.status === 401) {
      return {
        errorMsgs: ["Usuário não autorizado ou a sessão expirou. Por favor, refaça seu login."],
        cod: e.response?.status
      };
    }

    return {
      errorMsgs: ["Esse login já existe."]
    };
  }
}

export async function getLocations(): Promise<LocationsResponse | ErrorResponse> {//mudar o error aqui tbm
  try {
    const response = await api.get('/api/v1/Location', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("@auth:token")
      }
    });
    const responseLocation: LocationsResponse = {
      locations: []
    }
    response.data.map((x: any) => {
      responseLocation.locations.push({
        userId: x.userId,
        login: x.login,
        longitude: x.longitude,
        latitude: x.latitude,
        lastPutDate: new Date(x.lastPutDate).toLocaleString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
        })
      })
    })
    return responseLocation;
  }
  catch (error) {
    const e = error as AxiosError;
    console.log(e);
    if (e.response?.status === 500) {
      return {
        errorMsgs: ['Algo deu errado no servidor! Tente novamente mais tarde'],
        cod: e.response?.status
      };
    }
    return {
      errorMsgs: ["Usuário não autorizado ou a sessão expirou. Por favor, refaça seu login."],
      cod: e.response?.status
    };
  }
}
