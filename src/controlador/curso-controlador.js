import banco from '../dados/db.js'

const listar = async (pedido, resposta) => {
    const [cursos] = await banco.query('SELECT * FROM cursos')
    resposta.json(cursos)
}

const criar = async (pedido, resposta) => {
    const {nome,codigo,qtd_semestres} = pedido.body
    const [resultado] = await banco.query('INSERT INTO cursos (nome,codigo,qtd_semestres) VALUES (?,?,?)',
        [nome,codigo,qtd_semestres]
    )

    resposta.json({id: resultado.insertId, nome,codigo,qtd_semestres})
}

const editar = async (pedido, resposta) => {
    const {nome,codigo,qtd_semestres} = pedido.body
    const { id } = pedido.params

    const [resultado] = await banco.query(
        'UPDATE cursos SET nome = ?, codigo = ?, qtd_semestres = ? WHERE id =?',
    [nome,codigo,qtd_semestres, id])

    if(resultado.affectedRows === 0) {
        resposta.json({ mensagem: 'curso não encontrado!'})
    }

    resposta.json({mensagem: 'curso editado com sucesso!'})
}

const deletar = async (pedido,resposta) => {
    const { id } = pedido.params
    const [resultado] = await banco.query('DELETE FROM cursos WHERE id = ?', [id])

    if(resultado.affectedRows === 0) {
        resposta.json({ mensagem: 'curso não encontrado!'})
    }
    
    resposta.json({ mensagem: 'curso deletado com sucesso!'})
}

export { listar, criar, editar, deletar }