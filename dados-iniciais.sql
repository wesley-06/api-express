INSERT INTO professores (nome, email, nascimento) VALUES
('Ana Beatriz Souza', 'ana.souza@escola.com', '1980-03-15'),
('Carlos Eduardo Lima', 'carlos.lima@escola.com', '1975-07-22'),
('Fernanda Ribeiro', 'fernanda.ribeiro@escola.com', '1985-11-30');

INSERT INTO alunos (nome, email, nascimento) VALUES
('João Pedro Alves', 'joao.alves@aluno.com', '2003-05-10'),
('Maria Clara Santos', 'maria.santos@aluno.com', '2002-09-18'),
('Lucas Gabriel Costa', 'lucas.costa@aluno.com', '2004-01-25'),
('Beatriz Oliveira', 'beatriz.oliveira@aluno.com', '2003-12-02');

INSERT INTO disciplinas (nome, codigo) VALUES
('Programação Web', 'PWEB101'),
('Banco de Dados', 'BD101'),
('Estrutura de Dados', 'ED101'),
('Engenharia de Requisitos', 'ER101');

-- Turmas (nome, disciplina_id, professor_id)
INSERT INTO turmas (nome, disciplina_id, professor_id) VALUES
('PWEB 2026.1', 1, 1),
('BD 2026.1', 2, 2),
('ED 2026.1', 3, 3),
('ER 2026.1', 4, 1);

-- Alunos nas turmas (turma_id, aluno_id)
INSERT INTO turma_alunos (turma_id, aluno_id) VALUES
(1, 1),
(2, 1),
(1, 2),
(3, 3),
(4, 4);
