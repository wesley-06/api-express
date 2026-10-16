import conexao from '../dados/db.js'

const listar = async (pedido, resposta) => {
    const [turmas] = await conexao.query('SELECT * FROM turmas')
    resposta.json(turmas)
}

const criar = async (pedido, resposta) => {
    const { id_professor, id_disciplina } = pedido.body

    const [resultado] = await conexao.query(
        'INSERT INTO turmas (id_professor, id_disciplina) VALUES (?, ?)',
        [id_professor, id_disciplina]
    )

    resposta.json({ id: resultado.insertId, id_professor, id_disciplina })
}

const editar = async (pedido, resposta) => {
    const { id } = pedido.params
    const { id_professor, id_disciplina } = pedido.body

    const [resultado] = await conexao.query(
        'UPDATE turmas SET id_professor = ?, id_disciplina = ? WHERE id = ?',
        [id_professor, id_disciplina, id]
    )

    if (resultado.affectedRows === 0) {
        return resposta.json({ mensagem: 'Turma não encontrada!' })
    }
    resposta.json({ mensagem: 'Turma atualizada com sucesso!' })
}

const deletar = async (pedido, resposta) => {
    const { id } = pedido.params

    const [resultado] = await conexao.query('DELETE FROM turmas WHERE id = ?', [id])

    if (resultado.affectedRows === 0) {
        return resposta.json({ mensagem: 'Turma não encontrada!' })
    }
    resposta.json({ mensagem: 'Turma deletada com sucesso!' })
}

export { listar, criar, editar, deletar }