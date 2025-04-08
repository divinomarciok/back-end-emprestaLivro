# App Empresta - Sistema de Empréstimo de Livros

Um sistema de gerenciamento de empréstimos de livros desenvolvido como projeto acadêmico.

## Estrutura do Projeto

O projeto está dividido em frontend e backend:

- **Backend**: API REST em Node.js com Express e TypeORM
- **Frontend**: Interface em React com TypeScript

## Funcionalidades

- Listagem de livros
- Cadastro de livros
- Cadastro de pessoas
- Registro de empréstimos
- Registro de devoluções

## Pré-requisitos

- Node.js (v14+)
- npm ou yarn
- PostgreSQL

## Configuração e Execução

### Backend

1. Instale as dependências:
   ```
   npm install
   ```

2. Configure o banco de dados no arquivo `src/models/config/dataSource.ts`

3. Execute as migrações:
   ```
   npm run runMigration
   ```

4. Inicie o servidor:
   ```
   npm run start:server
   ```

### Frontend

1. Instale as dependências:
   ```
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```
   npm run start:client
   ```

## Rotas da API

### Livros
- `GET /api/livros` - Listar todos os livros
- `GET /api/livros/disponiveis` - Listar livros disponíveis
- `POST /api/livros` - Cadastrar novo livro
- `POST /api/livros/atualiza` - Atualizar status do livro

### Pessoas
- `GET /api/pessoas` - Listar todas as pessoas
- `POST /api/pessoas` - Cadastrar nova pessoa

### Empréstimos
- `GET /api/emprestimos` - Listar todos os empréstimos ativos
- `POST /api/emprestimo` - Registrar novo empréstimo
- `PUT /api/emprestimos/:id/devolucao` - Registrar devolução

## Contribuições

Este é um projeto acadêmico. Contribuições são bem-vindas através de pull requests. 