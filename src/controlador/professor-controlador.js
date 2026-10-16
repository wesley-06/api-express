import banco from '../dados/db.js'

const listar = async (pedido, resposta) => {
    const [professores] = await banco.query('SELECT * FROM professores')
    resposta.json(professores)
}

const criar = async (pedido, resposta) => {
    const {matricula, nome, dataNasc, email} = pedido.body
    const [resultado] = await banco.query('INSERT INTO professores (matricula, nome, dataNasc, email) VALUES (?,?,?,?)',
        [matricula,nome,dataNasc,email]
    )

    resposta.json({id: resultado.insertId, matricula, nome, dataNasc, email})
}

const editar = async (pedido, resposta) => {
    const {matricula, nome, dataNasc, email} = pedido.body
    const { id } = pedido.params

    const [resultado] = await banco.query(
        'UPDATE professores SET matricula = ?, nome = ?, dataNasc = ?, email = ? WHERE id = ?',
    [matricula,nome,dataNasc,email, id])

    if(resultado.affectedRows === 0) {
        resposta.json({ mensagem: 'professor não encontrado!'})
    }

    resposta.json({mensagem: 'professor editado com sucesso!'})
}

const deletar = async (pedido,resposta) => {
    const { id } = pedido.params
    const [resultado] = await banco.query('DELETE FROM professores WHERE id = ?', [id])

    if(resultado.affectedRows === 0) {
        resposta.json({ mensagem: 'professor não encontrado!'})
    }
    
    resposta.json({ mensagem: 'professor deletado com sucesso!'})
}

export { listar, criar, editar, deletar }