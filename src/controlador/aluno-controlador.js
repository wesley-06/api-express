import banco from '../dados/db.js'

const listar = async (pedido, resposta) => {
    const { rows } = await banco.query(`
        SELECT a.*,
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
                        'nome', p.nome,
                        'email', p.email,
                        'nascimento', p.nascimento
                    )
                )) FILTER (WHERE t.id IS NOT NULL),
                '[]'
            ) AS turmas
        FROM alunos a
        LEFT JOIN turma_alunos ta ON ta.aluno_id = a.id
        LEFT JOIN turmas t ON t.id = ta.turma_id
        LEFT JOIN disciplinas d ON d.id = t.disciplina_id
        LEFT JOIN professores p ON p.id = t.professor_id
        GROUP BY a.id
        ORDER BY a.id
    `)
    resposta.json(rows)
}

const criar = async (pedido, resposta) => {
    const { nome, email, nascimento } = pedido.body
    const { rows } = await banco.query(
        'INSERT INTO alunos (nome, email, nascimento) VALUES ($1,$2,$3) RETURNING *',
        [nome, email, nascimento]
    )

    resposta.json(rows[0])
}

const editar = async (pedido, resposta) => {
    const { nome, email, nascimento } = pedido.body
    const { id } = pedido.params

    const resultado = await banco.query(
        'UPDATE alunos SET nome = $1, email = $2, nascimento = $3 WHERE id = $4',
        [nome, email, nascimento, id])

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