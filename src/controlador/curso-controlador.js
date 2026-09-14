import { cursos } from '../dados/db.js'

const listar = ((pedido, resposta) => {
    resposta.json(cursos)
})

const criar = ((pedido, resposta) => {
    const curso = {
        id: cursos.length + 1,
        nome: pedido.body.nome,
        codigo: pedido.body.codigo,
        qtd_semestres: pedido.body.qtd_semestres
    }

    cursos.push(curso)

    resposta.json(curso)
})

const editar = ( (pedido, resposta) => {
    const index = cursos.findIndex(curso => curso.id == pedido.params.id)
    if(index === -1) {
        return resposta.json({mensagem: 'curso não encontrado!'})
    }
    cursos[index] = { ...cursos[index], ...pedido.body}
    resposta.json(cursos[index])
})

const deletar = ( (pedido, resposta) => {
    const index = cursos.findIndex(curso => curso.id === pedido.params.id)
    if(index === -1) {
        return resposta.json({mensagem: 'curso não encontrado!'})
    }
    cursos.splice(index, 1)
    resposta.json({mensagem: 'curso deletado com sucesso!'})
})


export { listar, criar, editar, deletar }