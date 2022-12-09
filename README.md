# Polícia Móvel (Frontend)

Este repositório contém a implementação da interface web da aplicação *Polícia Móvel*. Com o intuíto de ser um aplicativo de auxílio às forças policiais, nasceu como um TCC da Universidade Tecnológica Federal do Paraná e agora é um projeto público que pode ser expandido e adaptado por qualquer indivíduo.

## Funcionalidades

Atualmente, o projeto conta com as seguintes funcionalidades:

- Tela de autenicação de usuários;
- Tela de visualização das posições dos outros usuários do (aplicativo)[https://github.com/RafaelLammel/utfpr-policiamovel-app] em um mapa;
- Tela de cadastro de usuários.

## Como Rodar

É necessário possuir o [Node](https://nodejs.org/en/) instalado e uma instância do [backend](https://github.com/RafaelLammel/utfpr-policiamovel-backend).

- Crie um arquivo **.env.local** na raíz do projeto, seguindo e preenchendo os valores de acordo com o arquivo **.env.example**;
- Execute o comando:

```bash
npm install
```

- Execute o comando:

```bash
npm start dev
```