import banco from '../dados/db.js'

const listar = async (pedido, resposta) => {
    const { rows } = await banco.query(`
        SELECT p.*,
            COALESCE(
                json_agg(json_build_object(
                    'id', t.id,
                    'nome', t.nome,
                    'disciplina_id', t.disciplina_id,
                    'disciplina', json_build_object(
                        'id', d.id,
                        'nome', d.nome,
                        'codigo', d.codigo
                    )
                )) FILTER (WHERE t.id IS NOT NULL),
                '[]'
            ) AS turmas,
            -- Cursos do professor: cursos das disciplinas que ele ministra
            (
                SELECT COALESCE(json_agg(json_build_object(
                    'id', c.id,
                    'nome', c.nome,
                    'codigo', c.codigo
                ) ORDER BY c.id), '[]')
                FROM cursos c
                WHERE c.id IN (
                    SELECT cd.curso_id
                    FROM curso_disciplinas cd
                    JOIN turmas t2 ON t2.disciplina_id = cd.disciplina_id
                    WHERE t2.professor_id = p.id
                )
            ) AS cursos
        FROM professores p
        LEFT JOIN turmas t ON t.professor_id = p.id
        LEFT JOIN disciplinas d ON d.id = t.disciplina_id
        GROUP BY p.id
        ORDER BY p.id
    `)
    resposta.json(rows)
}

const criar = async (pedido, resposta) => {
    const { matricula, nome, email, nascimento } = pedido.body
    const { rows } = await banco.query(
        'INSERT INTO professores (matricula, nome, email, nascimento) VALUES ($1,$2,$3,$4) RETURNING *',
        [matricula, nome, email, nascimento]
    )

    resposta.json(rows[0])
}

const editar = async (pedido, resposta) => {
    const { matricula, nome, email, nascimento } = pedido.body
    const { id } = pedido.params

    const resultado = await banco.query(
        'UPDATE professores SET matricula = $1, nome = $2, email = $3, nascimento = $4 WHERE id = $5',
        [matricula, nome, email, nascimento, id])

    if (resultado.rowCount === 0) {
        return resposta.json({ mensagem: 'professor não encontrado!' })
    }

    resposta.json({ mensagem: 'professor editado com sucesso!' })
}

const deletar = async (pedido, resposta) => {
    const { id } = pedido.params
    const resultado = await banco.query('DELETE FROM professores WHERE id = $1', [id])

    if (resultado.rowCount === 0) {
        return resposta.json({ mensagem: 'professor não encontrado!' })
    }

    resposta.json({ mensagem: 'professor deletado com sucesso!' })
}

export { listar, criar, editar, deletar }