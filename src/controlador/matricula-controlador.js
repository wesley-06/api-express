import conexao from '../dados/db.js'

// Matrícula = vínculo aluno <-> turma (tabela turma_alunos)
const listar = async (pedido, resposta) => {
    const { rows } = await conexao.query('SELECT * FROM turma_alunos')
    resposta.json(rows)
}

const criar = async (pedido, resposta) => {
    const { turma_id, aluno_id } = pedido.body

    const { rows } = await conexao.query(
        'INSERT INTO turma_alunos (turma_id, aluno_id) VALUES ($1, $2) RETURNING *',
        [turma_id, aluno_id]
    )

    resposta.json(rows[0])
}

const deletar = async (pedido, resposta) => {
    const { turma_id, aluno_id } = pedido.params

    const resultado = await conexao.query(
        'DELETE FROM turma_alunos WHERE turma_id = $1 AND aluno_id = $2',
        [turma_id, aluno_id]
    )

    if (resultado.rowCount === 0) {
        return resposta.json({ mensagem: 'Matrícula não encontrada!' })
    }
    resposta.json({ mensagem: 'Matrícula removida com sucesso!' })
}

export { listar, criar, deletar }