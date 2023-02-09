# Projeto NG Cash!

# Contexto
Este projeto trata-se de uma aplicação full-stack feita em React, Context API, TypeScript, NodeJS, ExpressJS, Sequelize. Neste projeto foi criado um App web simulando um banco em que é possivel cadastrar no banco, realizar login e fazer transferências para outros usuários do banco(segue no fim do Read.me, alguns dados já existente no banco para teste caso deseje), o programa não permite transferir dinheiro para si mesmo, usuários não existente ou caso não haja dinheiro suficiente, também é possivel ver os dados das transações feita pela conta ou recebido pela conta.

## Técnologias usadas

Front-end:
> Desenvolvido usando: React, Context API, React Router, CSS3, HTML5, TypeScript, Docker.

Back-end:
> Desenvolvido usando: NodeJS, ExpressJS, Sequelize, PostgreSQL, TypeScript, POO, SOLID, Md5, JWT.

## Executando aplicação

* Para subir o conteiner da aplicação:

  ```bash
  cd Teste-Tecnico-NG-CASH/ && docker-compose up -d
  ```

* Para rodar a aplicação:

  ```bash
  docker exec -it app_backend bash
  ```
  
  ```bash
  npm start
  ```

Api rodando em http://localhost:3001/ e front rodando em http://localhost:3000/


USUÁRIOS do Banco de Dados para Teste: [
{
username: 'fulano',
password: '303e855e7e5631bfcc829bf493dfa596', //fulaNo123
account_id: 1
},
{
username: 'ciclano',
password: 'ef27745f9832c525734a22a3e2c31c72', //ciclaNo123
account_id: 2
},
{
username: 'beltrano',
password: 'e3265ec38610b047e0e6efb2dd62e343', //beltraNo123
account_id: 3
},
]
 

