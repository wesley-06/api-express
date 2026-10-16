import banco from '../dados/db.js'

const listar = async (pedido, resposta) => {
    const [alunos] = await banco.query('SELECT * FROM alunos')
    resposta.json(alunos)
}

const criar = async (pedido, resposta) => {
    const {matricula, nome, dataNasc, email} = pedido.body
    const [resultado] = await banco.query('INSERT INTO alunos (matricula, nome, dataNasc, email) VALUES (?,?,?,?)',
        [matricula,nome,dataNasc,email]
    )

    resposta.json({id: resultado.insertId, matricula, nome, dataNasc, email})
}

const editar = async (pedido, resposta) => {
    const {matricula, nome, dataNasc, email} = pedido.body
    const { id } = pedido.params

    const [resultado] = await banco.query(
        'UPDATE alunos SET matricula = ?, nome = ?, dataNasc = ?, email = ? WHERE id = ?',
    [matricula,nome,dataNasc,email,id])

    if(resultado.affectedRows === 0) {
        resposta.json({ mensagem: 'Aluno não encontrado!'})
    }

    resposta.json({mensagem: 'Aluno editado com sucesso!'})
}

const deletar = async (pedido,resposta) => {
    const { id } = pedido.params
    const [resultado] = await banco.query('DELETE FROM alunos WHERE id = ?', [id])

    if(resultado.affectedRows === 0) {
        resposta.json({ mensagem: 'Aluno não encontrado!'})
    }
    
    resposta.json({ mensagem: 'Aluno deletado com sucesso!'})
}

export { listar, criar, editar, deletar }