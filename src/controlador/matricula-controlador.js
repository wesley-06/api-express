import conexao from '../dados/db.js'

const listar = async (pedido, resposta) => {
    const [matriculas] = await conexao.query('SELECT * FROM matriculas')
    resposta.json(matriculas)
}

const criar = async (pedido, resposta) => {
    const { id_aluno, id_turma } = pedido.body

    const [resultado] = await conexao.query(
        'INSERT INTO matriculas (id_aluno, id_turma) VALUES (?, ?)',
        [id_aluno, id_turma]
    )

    resposta.json({ id: resultado.insertId, id_aluno, id_turma })
}

const deletar = async (pedido, resposta) => {
    const { id } = pedido.params

    const [resultado] = await conexao.query('DELETE FROM matriculas WHERE id = ?', [id])

    if (resultado.affectedRows === 0) {
        return resposta.json({ mensagem: 'Matrícula não encontrada!' })
    }
    resposta.json({ mensagem: 'Matrícula removida com sucesso!' })
}

export { listar, criar, deletar }