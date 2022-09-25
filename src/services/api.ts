import axios, {AxiosError} from 'axios';
import {LoginRequest} from '../interfaces/requests/LoginRequest';
import {LoginResponse} from '../interfaces/responses/LoginResponse';
import {LocationsResponse} from '../interfaces/responses/LocationsResponse'
import {LoginErrorResponse} from '../interfaces/responses/LoginErrorResponse';

const api = axios.create({
  baseURL: 'https://api.tccpm.tk'
});


export async function login(
  loginRequest: LoginRequest,
): Promise<LoginResponse | LoginErrorResponse> {
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
      };
    } else if (e.response?.status === 404) {
      return {errorMsgs: ['Login ou senha incorretos!']};
    }

    const loginErrorResponse: LoginErrorResponse = {
      errorMsgs: [],
    } as LoginErrorResponse;
    const errors: any = e.response?.data;

    Object.values(errors.errors).forEach(value => {
      const errorList = value as string[];
      errorList.forEach(v => loginErrorResponse.errorMsgs.push(v));
    });

    return loginErrorResponse;
  }
}

export async function getLocations(): Promise<LocationsResponse | LoginErrorResponse>{//mudar o error aqui tbm
  try {
    const response = await api.get('/api/v1/Location', {
      headers:{
        Authorization: "Bearer " + localStorage.getItem("@auth:token")
      }
    });
    const responseLocation : LocationsResponse = {
      locations: []
    }
    response.data.map((x: any) => {
      responseLocation.locations.push({
        userId: x.userId,
        longitude: x.longitude,
        latitude: x.latitude
      })
    })
    return responseLocation;
  }
  catch (error){
    const e = error as AxiosError;

    if (e.response?.status === 500) {
      return {
        errorMsgs: ['Algo deu errado no servidor! Tente novamente mais tarde'],
      };
    }
    return {
      errorMsgs: ["Usuário não autorizado ou a sessão expirou. Por favor, refaça seu login."]
    };
  }
}