# API Escola — Node.js + Express + PostgreSQL (Supabase)

API didática para aulas de desenvolvimento web com CRUD de alunos, professores,
disciplinas e turmas, usando **Express** e **PostgreSQL** (Supabase) via `pg`.

---

## Como rodar

1. Instale as dependências:

```bash
npm install
```

2. Crie o arquivo `.env` na raiz:

```env
PORT=3000
DATABASE_URL=postgresql://usuario:senha@host:6543/postgres
```

3. No **SQL Editor** do Supabase, execute na ordem:
   - `schema.sql` (cria as tabelas)
   - `dados-iniciais.sql` (dados de exemplo)

4. Inicie o servidor:

```bash
npm run dev
```

Servidor em `http://localhost:3000`

---

## Modelagem

- **cursos**: `id`, `nome`, `codigo` (único)
- **alunos**: `id`, `matricula` (única), `nome`, `email` (único), `nascimento`, `curso_id`
- **professores**: `id`, `matricula` (única), `nome`, `email` (único), `nascimento`
- **disciplinas**: `id`, `nome`, `codigo` (único)
- **turmas**: `id`, `nome`, `disciplina_id`, `professor_id`
- **turma_alunos**: `turma_id`, `aluno_id` (relação N:N entre turmas e alunos)
- **curso_disciplinas**: `curso_id`, `disciplina_id` (relação N:N entre cursos e disciplinas)

---

## Rotas

| Método | URL                                  | Ação                                   |
|--------|--------------------------------------|----------------------------------------|
| GET    | /alunos                              | Lista alunos com curso e turmas        |
| POST   | /alunos                              | Cria aluno                             |
| PUT    | /alunos/:id                          | Atualiza aluno                         |
| DELETE | /alunos/:id                          | Remove aluno                           |
| GET    | /professores                         | Lista professores com turmas e cursos  |
| POST   | /professores                         | Cria professor                         |
| PUT    | /professores/:id                     | Atualiza professor                     |
| DELETE | /professores/:id                     | Remove professor                       |
| GET    | /disciplinas                         | Lista disciplinas com seus cursos      |
| POST   | /disciplinas                         | Cria disciplina                        |
| PUT    | /disciplinas/:id                     | Atualiza disciplina                    |
| DELETE | /disciplinas/:id                     | Remove disciplina                      |
| GET    | /turmas                              | Lista turmas com professor e alunos    |
| POST   | /turmas                              | Cria turma                             |
| PUT    | /turmas/:id                          | Atualiza turma                         |
| DELETE | /turmas/:id                          | Remove turma                           |
| GET    | /matriculas                          | Lista vínculos turma/aluno             |
| POST   | /matriculas                          | Matricula um aluno em uma turma        |
| DELETE | /matriculas/:turma_id/:aluno_id      | Remove a matrícula                     |
| GET    | /cursos                              | Lista cursos com suas disciplinas      |
| POST   | /cursos                              | Cria curso                             |
| PUT    | /cursos/:id                          | Atualiza curso                         |
| DELETE | /cursos/:id                          | Remove curso                           |
| POST   | /cursos/:id/disciplinas              | Vincula disciplina ao curso            |
| DELETE | /cursos/:id/disciplinas/:disciplina_id | Remove disciplina do curso           |

---

## Exemplos com `curl`

### Criar aluno
```bash
curl -X POST http://localhost:3000/alunos \
  -H "Content-Type: application/json" \
  -d '{"matricula": "2026100005", "nome": "Carlos Souza", "email": "carlos@aluno.com", "nascimento": "2001-04-12", "curso_id": 1}'
```

### Criar disciplina
```bash
curl -X POST http://localhost:3000/disciplinas \
  -H "Content-Type: application/json" \
  -d '{"nome": "Programação Web", "codigo": "PWEB101"}'
```

### Criar turma
```bash
curl -X POST http://localhost:3000/turmas \
  -H "Content-Type: application/json" \
  -d '{"nome": "PWEB 2026.1", "disciplina_id": 1, "professor_id": 1}'
```

### Matricular aluno em turma
```bash
curl -X POST http://localhost:3000/matriculas \
  -H "Content-Type: application/json" \
  -d '{"turma_id": 1, "aluno_id": 1}'
```

### Remover matrícula
```bash
curl -X DELETE http://localhost:3000/matriculas/1/1
```

---

## Formato das respostas de listagem

### Aluno
```json
{
  "id": 1,
  "nome": "João Pedro Alves",
  "email": "joao.alves@aluno.com",
  "nascimento": "2003-05-10T00:00:00.000Z",
  "turmas": [
    {
      "id": 1,
      "nome": "PWEB 2026.1",
      "disciplina": { "id": 1, "nome": "Programação Web", "codigo": "PWEB101" },
      "professor": { "id": 1, "nome": "Ana Beatriz Souza", "email": "ana.souza@escola.com" }
    }
  ]
}
```

### Turma
```json
{
  "id": 1,
  "nome": "PWEB 2026.1",
  "disciplina_id": 1,
  "professor_id": 1,
  "professor": { "id": 1, "nome": "Ana Beatriz Souza" },
  "alunos": [{ "id": 1, "nome": "João Pedro Alves" }]
}
```

---

## Deploy no Render

1. Envie o código para o GitHub.
2. No Render, clique em **New > Web Service** e vincule o repositório.
3. Preencha:
   - **Language:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Em **Environment Variables**, adicione `DATABASE_URL`
   (a porta `PORT` é definida pelo próprio Render).
5. Após o deploy, acesse a URL gerada (ex.: `https://api-express.onrender.com/`).

> **Importante (Supabase):** use a connection string do **Session pooler**
> (`...pooler.supabase.com`), disponível em *Connect* no painel do Supabase.
> A conexão direta (`db.xxxx.supabase.co`) usa apenas IPv6, que o Render não suporta.

---

## Observações

- O `.env` está no `.gitignore` — não versione suas credenciais.
- Não há autenticação, propositalmente, para fins didáticos.