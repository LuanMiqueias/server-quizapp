# API - para quiz app

Essa é minha primeira api feita com NodeJS e MongoDB, nela é possivel listar quizzes de todos os usuarios, responder, criar contas, login e criar seu próprios quizzes.

- [`Link da API`](https://quizluan.herokuapp.com/)
## No que eu estou trabalhando no momento:
- [X] Dashboard.
- [ ] Adicionar rota para busca e filtros.
- [ ] Explicar melhor todas as rotas e funcionalidades.

## Rotas
#### Rotas que não precisam do token
- `/all` GET - Irá listar todos os quizzes - Limitado a 10 mais em breve irei colocar um paginação.

- `/quiz/[id]` GET - Irá listar as perguntas, respostas e a alternativa correta de acordo com o id do quiz passado.

- `/login` POST - Enviando o email e senha corretos será retornado o token para acesso.

- `/register` POST - Enviando o nome, senha e email, criará um novo usuario. 


#### Rotas que precisam do token 
- `/new-question` POST - Cria um novo quiz.

- `/user` POST - Será retornado dados do usuario logado como nome e email.

- `/dashboard` POST - Será retornada uma lista de dados mais completa do usuario logado - nome, email, historico de partidas e quizzes criados.

