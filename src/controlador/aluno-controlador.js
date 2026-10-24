import banco from '../dados/db.js'

const listar = async (pedido, resposta) => {
    const { rows } = await banco.query(`
        SELECT a.*,
            json_build_object(
                'id', c.id,
                'nome', c.nome,
                'codigo', c.codigo
            ) AS curso,
            COALESCE(
                json_agg(json_build_object(
                    'id', t.id,
                    'nome', t.nome,
                    'disciplina_id', t.disciplina_id,
                    'professor_id', t.professor_id,
                    'disciplina', json_build_object(
                        'id', d.id,
                        'nome', d.nome,
                        'codigo', d.codigo
                    ),
                    'professor', json_build_object(
                        'id', p.id,
                        'matricula', p.matricula,
                        'nome', p.nome,
                        'email', p.email,
                        'nascimento', p.nascimento
                    )
                )) FILTER (WHERE t.id IS NOT NULL),
                '[]'
            ) AS turmas
        FROM alunos a
        JOIN cursos c ON c.id = a.curso_id
        LEFT JOIN turma_alunos ta ON ta.aluno_id = a.id
        LEFT JOIN turmas t ON t.id = ta.turma_id
        LEFT JOIN disciplinas d ON d.id = t.disciplina_id
        LEFT JOIN professores p ON p.id = t.professor_id
        GROUP BY a.id, c.id
        ORDER BY a.id
    `)
    resposta.json(rows)
}

const criar = async (pedido, resposta) => {
    const { matricula, nome, email, nascimento, curso_id } = pedido.body
    const { rows } = await banco.query(
        'INSERT INTO alunos (matricula, nome, email, nascimento, curso_id) VALUES ($1,$2,$3,$4,$5) RETURNING *',
        [matricula, nome, email, nascimento, curso_id]
    )

    resposta.json(rows[0])
}

const editar = async (pedido, resposta) => {
    const { matricula, nome, email, nascimento, curso_id } = pedido.body
    const { id } = pedido.params

    const resultado = await banco.query(
        'UPDATE alunos SET matricula = $1, nome = $2, email = $3, nascimento = $4, curso_id = $5 WHERE id = $6',
        [matricula, nome, email, nascimento, curso_id, id])

    if (resultado.rowCount === 0) {
        return resposta.json({ mensagem: 'Aluno não encontrado!' })
    }

    resposta.json({ mensagem: 'Aluno editado com sucesso!' })
}

const deletar = async (pedido, resposta) => {
    const { id } = pedido.params
    const resultado = await banco.query('DELETE FROM alunos WHERE id = $1', [id])

    if (resultado.rowCount === 0) {
        return resposta.json({ mensagem: 'Aluno não encontrado!' })
    }

    resposta.json({ mensagem: 'Aluno deletado com sucesso!' })
}

export { listar, criar, editar, deletar }