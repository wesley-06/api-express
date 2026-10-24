-- Curso: ex. Análise e Desenvolvimento de Sistemas
CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    codigo TEXT NOT NULL UNIQUE
);

-- Aluno: pertence a um curso
CREATE TABLE alunos (
    id SERIAL PRIMARY KEY,
    matricula TEXT NOT NULL UNIQUE,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    nascimento TIMESTAMP(3) NOT NULL,
    curso_id INT NOT NULL REFERENCES cursos(id)
);

CREATE TABLE disciplinas (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    codigo TEXT NOT NULL UNIQUE
);

CREATE TABLE professores (
    id SERIAL PRIMARY KEY,
    matricula TEXT NOT NULL UNIQUE,
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

-- Relação muitos-para-muitos entre cursos e disciplinas
CREATE TABLE curso_disciplinas (
    curso_id INT NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
    disciplina_id INT NOT NULL REFERENCES disciplinas(id) ON DELETE CASCADE,
    PRIMARY KEY (curso_id, disciplina_id)
);

-- Relação muitos-para-muitos entre turmas e alunos
CREATE TABLE turma_alunos (
    turma_id INT NOT NULL REFERENCES turmas(id) ON DELETE CASCADE,
    aluno_id INT NOT NULL REFERENCES alunos(id) ON DELETE CASCADE,
    PRIMARY KEY (turma_id, aluno_id)
);