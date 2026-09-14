import { turmas } from '../dados/db.js'

const listar = ((pedido, resposta) => {
    resposta.json(turmas)
})

const criar = ((pedido, resposta) => {
    const turma = {
        id: turmas.length + 1,
        id_professor: pedido.body.id_professor
    }

    turmas.push(turma)

    resposta.json(turma)
})

const editar = ( (pedido, resposta) => {
    const index = turmas.findIndex(turma => turma.id == pedido.params.id)
    if(index === -1) {
        return resposta.json({mensagem: 'turma não encontrado!'})
    }
    turmas[index] = { ...turmas[index], ...pedido.body}
    resposta.json(turmas[index])
})

const deletar = ( (pedido, resposta) => {
    const index = turmas.findIndex(turma => turma.id === pedido.params.id)
    if(index === -1) {
        return resposta.json({mensagem: 'turma não encontrado!'})
    }
    turmas.splice(index, 1)
    resposta.json({mensagem: 'turma deletado com sucesso!'})
})


export { listar, criar, editar, deletar }