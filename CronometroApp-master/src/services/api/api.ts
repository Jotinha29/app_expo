import axios from 'axios';

export const versaoAplicativo = "1.0.0";

// Atenção: O IP pode variar em dispositivos Android ou iOS
const obterBaseURL = (): string => {
  const ipLocal = "172.20.10.3";
  const porta = 3000;
  return `http://${ipLocal}:${porta}`;
};

export const clienteAPI = axios.create({
  baseURL: obterBaseURL(),
});
