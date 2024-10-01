
# Contador Restaurante App

O Contador Restaurante é um aplicativo que ajuda a contar o número de pessoas que entram e saem de um restaurante. O número total é atualizado em tempo real, com os dados armazenados via **JSON Server**.

## Funcionalidades

- Incrementa ou decrementa o número de pessoas no restaurante.
- Atualiza o número em tempo real e armazena os dados no servidor JSON.

## Tecnologias

- React Native
- JSON Server

## Configuração

1. Clone este repositório:
```bash
git clone https://github.com/seu-usuario/fortune-cookie-app.git
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o JSON Server:

 - Certifique-se de que o JSON Server esteja instalado:

```bash
npm install -g json-server
```

4. Rode o JSON Server:
```bash
json-server --watch db.json --host [seu IP]
```
 - Substitua `[seu IP]` pelo seu endereço IP local.

5. Altere a URL da API no código:

 - No arquivo api.js, modifique a URL base para o IP da sua máquina:
```js
const API_URL = 'http://[seu IP]:3000';
```
6. Execute o aplicativo:
```bash
npm start
```

## Observações
Certifique-se de que o dispositivo ou emulador está conectado à mesma rede que a máquina onde o JSON Server está rodando.