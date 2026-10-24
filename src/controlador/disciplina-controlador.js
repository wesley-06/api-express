import banco from '../dados/db.js'

const listar = async (pedido, resposta) => {
    const { rows } = await banco.query(`
        SELECT d.*,
            COALESCE(
                json_agg(json_build_object(
                    'id', c.id,
                    'nome', c.nome,
                    'codigo', c.codigo
                ) ORDER BY c.id) FILTER (WHERE c.id IS NOT NULL),
                '[]'
            ) AS cursos
        FROM disciplinas d
        LEFT JOIN curso_disciplinas cd ON cd.disciplina_id = d.id
        LEFT JOIN cursos c ON c.id = cd.curso_id
        GROUP BY d.id
        ORDER BY d.id
    `)
    resposta.json(rows)
}

const criar = async (pedido, resposta) => {
    const { nome, codigo } = pedido.body
    const { rows } = await banco.query(
        'INSERT INTO disciplinas (nome, codigo) VALUES ($1,$2) RETURNING *',
        [nome, codigo]
    )

    resposta.json(rows[0])
}

const editar = async (pedido, resposta) => {
    const { nome, codigo } = pedido.body
    const { id } = pedido.params

    const resultado = await banco.query(
        'UPDATE disciplinas SET nome = $1, codigo = $2 WHERE id = $3',
        [nome, codigo, id])

    if (resultado.rowCount === 0) {
        return resposta.json({ mensagem: 'disciplina não encontrada!' })
    }

    resposta.json({ mensagem: 'disciplina editada com sucesso!' })
}

const deletar = async (pedido, resposta) => {
    const { id } = pedido.params
    const resultado = await banco.query('DELETE FROM disciplinas WHERE id = $1', [id])

    if (resultado.rowCount === 0) {
        return resposta.json({ mensagem: 'disciplina não encontrada!' })
    }

    resposta.json({ mensagem: 'disciplina deletada com sucesso!' })
}

export { listar, criar, editar, deletar }