# API Rest

Esta aplicação consistem em uma API Rest que possibilita o registro de transações financeiras com o objetivo de controlar o saldo.

## End-points

| Métoro | url | função | 
|--------|-----|--------|
| GET | /transactions| lista todoas as transações   |
| GET | /transactions/summary | caltula o saldo das transações |
| GET | /transactions/id | 
| DELETE | /transactions/id
| POST | /transactions
| PUT | /transactions/id

## tech's

fastfy 4.21
knex.js 
zod
dotenv
vitest
supertest
tsup

## Requisitos

### Funcionais

- [x] O usuário deve poder criar uma nova transação;
- [x] O usuário deve poder obter um resumo da sua conta;
- [x] O usuário deve listar todas as transações que já ocorreram;
- [x] O usupario deve poder visualizar uma tranzação única;
- [x] O usupario deve poder excluir uma tranzação única;

### Não funcionais

- [x] A transação poder ser tipo crédito que somará ao valor total, ou débito subtrairá;
- [x] Deve ser possível identificarmos o usuário entre as requisições;
- [x] O usuáiro só pode visualizar transações o qual ele criou;


## Regras de Negócio

# Instalação

# Testes

