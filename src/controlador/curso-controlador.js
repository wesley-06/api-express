import banco from '../dados/db.js'

const listar = async (pedido, resposta) => {
    const { rows } = await banco.query(`
        SELECT c.*,
            COALESCE(
                json_agg(json_build_object(
                    'id', d.id,
                    'nome', d.nome,
                    'codigo', d.codigo
                ) ORDER BY d.id) FILTER (WHERE d.id IS NOT NULL),
                '[]'
            ) AS disciplinas
        FROM cursos c
        LEFT JOIN curso_disciplinas cd ON cd.curso_id = c.id
        LEFT JOIN disciplinas d ON d.id = cd.disciplina_id
        GROUP BY c.id
        ORDER BY c.id
    `)
    resposta.json(rows)
}

const criar = async (pedido, resposta) => {
    const { nome, codigo } = pedido.body
    const { rows } = await banco.query(
        'INSERT INTO cursos (nome, codigo) VALUES ($1,$2) RETURNING *',
        [nome, codigo]
    )

    resposta.json(rows[0])
}

const editar = async (pedido, resposta) => {
    const { nome, codigo } = pedido.body
    const { id } = pedido.params

    const resultado = await banco.query(
        'UPDATE cursos SET nome = $1, codigo = $2 WHERE id = $3',
        [nome, codigo, id])

    if (resultado.rowCount === 0) {
        return resposta.json({ mensagem: 'Curso não encontrado!' })
    }

    resposta.json({ mensagem: 'Curso editado com sucesso!' })
}

const deletar = async (pedido, resposta) => {
    const { id } = pedido.params
    const resultado = await banco.query('DELETE FROM cursos WHERE id = $1', [id])

    if (resultado.rowCount === 0) {
        return resposta.json({ mensagem: 'Curso não encontrado!' })
    }

    resposta.json({ mensagem: 'Curso deletado com sucesso!' })
}

// Vincula uma disciplina ao curso (tabela curso_disciplinas)
const adicionarDisciplina = async (pedido, resposta) => {
    const { id } = pedido.params
    const { disciplina_id } = pedido.body

    const { rows } = await banco.query(
        'INSERT INTO curso_disciplinas (curso_id, disciplina_id) VALUES ($1, $2) RETURNING *',
        [id, disciplina_id]
    )

    resposta.json(rows[0])
}

// Remove o vínculo entre a disciplina e o curso
const removerDisciplina = async (pedido, resposta) => {
    const { id, disciplina_id } = pedido.params

    const resultado = await banco.query(
        'DELETE FROM curso_disciplinas WHERE curso_id = $1 AND disciplina_id = $2',
        [id, disciplina_id]
    )

    if (resultado.rowCount === 0) {
        return resposta.json({ mensagem: 'Disciplina não vinculada a este curso!' })
    }

    resposta.json({ mensagem: 'Disciplina removida do curso com sucesso!' })
}

export { listar, criar, editar, deletar, adicionarDisciplina, removerDisciplina }

