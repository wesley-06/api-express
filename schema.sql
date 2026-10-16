CREATE TABLE alunos (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    nascimento TIMESTAMP(3) NOT NULL
);

CREATE TABLE disciplinas (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    codigo TEXT NOT NULL UNIQUE
);

CREATE TABLE professores (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    nascimento TIMESTAMP(3) NOT NULL
);

-- Turma: uma disciplina ministrada por um professor
CREATE TABLE turmas (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    disciplina_id INT NOT NULL REFERENCES disciplinas(id),
    professor_id INT NOT NULL REFERENCES professores(id)
);

-- Relação muitos-para-muitos entre turmas e alunos
CREATE TABLE turma_alunos (
    turma_id INT NOT NULL REFERENCES turmas(id) ON DELETE CASCADE,
    aluno_id INT NOT NULL REFERENCES alunos(id) ON DELETE CASCADE,
    PRIMARY KEY (turma_id, aluno_id)
);
