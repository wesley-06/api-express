import conexao from '../dados/db.js'

const listar = async (pedido, resposta) => {
    const { rows } = await conexao.query(`
        SELECT t.*,
            json_build_object(
                'id', p.id,
                'nome', p.nome,
                'email', p.email,
                'nascimento', p.nascimento
            ) AS professor,
            COALESCE(
                json_agg(json_build_object(
                    'id', a.id,
                    'nome', a.nome,
                    'email', a.email,
                    'nascimento', a.nascimento
                )) FILTER (WHERE a.id IS NOT NULL),
                '[]'
            ) AS alunos
        FROM turmas t
        JOIN professores p ON p.id = t.professor_id
        LEFT JOIN turma_alunos ta ON ta.turma_id = t.id
        LEFT JOIN alunos a ON a.id = ta.aluno_id
        GROUP BY t.id, p.id
        ORDER BY t.id
    `)
    resposta.json(rows)
}

const criar = async (pedido, resposta) => {
    const { nome, disciplina_id, professor_id } = pedido.body

    const { rows } = await conexao.query(
        'INSERT INTO turmas (nome, disciplina_id, professor_id) VALUES ($1, $2, $3) RETURNING *',
        [nome, disciplina_id, professor_id]
    )

    resposta.json(rows[0])
}

const editar = async (pedido, resposta) => {
    const { id } = pedido.params
    const { nome, disciplina_id, professor_id } = pedido.body

    const resultado = await conexao.query(
        'UPDATE turmas SET nome = $1, disciplina_id = $2, professor_id = $3 WHERE id = $4',
        [nome, disciplina_id, professor_id, id]
    )

    if (resultado.rowCount === 0) {
        return resposta.json({ mensagem: 'Turma não encontrada!' })
    }
    resposta.json({ mensagem: 'Turma atualizada com sucesso!' })
}

const deletar = async (pedido, resposta) => {
    const { id } = pedido.params

    const resultado = await conexao.query('DELETE FROM turmas WHERE id = $1', [id])

    if (resultado.rowCount === 0) {
        return resposta.json({ mensagem: 'Turma não encontrada!' })
    }
    resposta.json({ mensagem: 'Turma deletada com sucesso!' })
}

export { listar, criar, editar, deletar }