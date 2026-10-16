CREATE DATABASE IF NOT EXISTS escola;
USE escola;

-- Curso independente, não depende de mais ninguém
CREATE TABLE cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    codigo VARCHAR(20) NOT NULL,
    qtd_semestres INT NOT NULL
);

-- Disciplina pertence a um curso
CREATE TABLE disciplinas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    codigo VARCHAR(20) NOT NULL,
    id_curso INT NOT NULL,
    FOREIGN KEY (id_curso) REFERENCES cursos(id)
);

-- Professor independente
CREATE TABLE professores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    matricula VARCHAR(20) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    dataNasc DATE,
    email VARCHAR(100)
);

-- Aluno independente
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    matricula VARCHAR(20) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    dataNasc DATE,
    email VARCHAR(100)
);

-- Turma: uma disciplina sendo ministrada por um professor
CREATE TABLE turmas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_professor INT NOT NULL,
    id_disciplina INT NOT NULL,
    FOREIGN KEY (id_professor) REFERENCES professores(id),
    FOREIGN KEY (id_disciplina) REFERENCES disciplinas(id)
);

-- Matricula: liga aluno <-> turma (muitos para muitos)
CREATE TABLE matriculas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_aluno INT NOT NULL,
    id_turma INT NOT NULL,
    FOREIGN KEY (id_aluno) REFERENCES alunos(id),
    FOREIGN KEY (id_turma) REFERENCES turmas(id),
    UNIQUE (id_aluno, id_turma)
);
