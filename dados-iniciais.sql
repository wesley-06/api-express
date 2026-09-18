USE escola;

-- Cursos
INSERT INTO cursos (nome, codigo, qtd_semestres) VALUES
('Análise e Desenvolvimento de Sistemas', 'ADS', 4),
('Ciência da Computação', 'CC', 8),
('Engenharia de Software', 'ES', 8);

-- Professores
INSERT INTO professores (matricula, nome, dataNasc, email) VALUES
('PROF001', 'Ana Beatriz Souza', '1980-03-15', 'ana.souza@escola.com'),
('PROF002', 'Carlos Eduardo Lima', '1975-07-22', 'carlos.lima@escola.com'),
('PROF003', 'Fernanda Ribeiro', '1985-11-30', 'fernanda.ribeiro@escola.com');

-- Alunos
INSERT INTO alunos (matricula, nome, dataNasc, email) VALUES
('2024001', 'João Pedro Alves', '2003-05-10', 'joao.alves@aluno.com'),
('2024002', 'Maria Clara Santos', '2002-09-18', 'maria.santos@aluno.com'),
('2024003', 'Lucas Gabriel Costa', '2004-01-25', 'lucas.costa@aluno.com'),
('2024004', 'Beatriz Oliveira', '2003-12-02', 'beatriz.oliveira@aluno.com');

-- Disciplinas (id_curso: 1 = ADS, 2 = CC, 3 = ES)
INSERT INTO disciplinas (nome, codigo, id_curso) VALUES
('Programação Web', 'PWEB101', 1),
('Banco de Dados', 'BD101', 1),
('Estrutura de Dados', 'ED101', 2),
('Engenharia de Requisitos', 'ER101', 3);

-- Turmas (id_professor, id_disciplina)
INSERT INTO turmas (id_professor, id_disciplina) VALUES
(1, 1), -- Ana leciona Programação Web
(2, 2), -- Carlos leciona Banco de Dados
(3, 3), -- Fernanda leciona Estrutura de Dados
(1, 4); -- Ana leciona Engenharia de Requisitos

-- Matrículas (id_aluno, id_turma)
INSERT INTO matriculas (id_aluno, id_turma) VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 3),
(4, 4);
