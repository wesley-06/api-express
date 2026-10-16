import banco from '../dados/db.js'

const listar = async (pedido, resposta) => {
    const [disciplinas] = await banco.query('SELECT * FROM disciplinas')
    resposta.json(disciplinas)
}

const criar = async (pedido, resposta) => {
    const {nome,codigo,id_curso} = pedido.body
    const [resultado] = await banco.query('INSERT INTO disciplinas (nome,codigo,id_curso) VALUES (?,?,?)',
        [nome,codigo,id_curso]
    )

    resposta.json({id: resultado.insertId, nome,codigo,id_curso})
}

const editar = async (pedido, resposta) => {
    const {nome,codigo,id_curso} = pedido.body
    const { id } = pedido.params

    const [resultado] = await banco.query(
        'UPDATE disciplinas SET nome = ?, codigo = ?, id_curso = ? WHERE  id = ?',
    [nome,codigo,id_curso, id])

    if(resultado.affectedRows === 0) {
        resposta.json({ mensagem: 'disciplina não encontrado!'})
    }

    resposta.json({mensagem: 'disciplina editado com sucesso!'})
}

const deletar = async (pedido,resposta) => {
    const { id } = pedido.params
    const [resultado] = await banco.query('DELETE FROM disciplinas WHERE id = ?', [id])

    if(resultado.affectedRows === 0) {
        resposta.json({ mensagem: 'disciplina não encontrado!'})
    }
    
    resposta.json({ mensagem: 'disciplina deletado com sucesso!'})
}

export { listar, criar, editar, deletar }