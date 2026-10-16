import banco from '../dados/db.js'

const listar = async (pedido, resposta) => {
    const { rows } = await banco.query('SELECT * FROM disciplinas')
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