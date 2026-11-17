const tratarErro = (acao) => (handler) => async (pedido, resposta, next) => {
    try {
        return await handler(pedido, resposta, next)
    } catch (erro) {
        console.error(`[${acao}]`, erro)

        if (resposta.headersSent) {
            return next?.(erro)
        }

        if (erro?.code === '23505') {
            return resposta.status(409).json({ mensagem: 'Registro já existente.' })
        }

        if (erro?.code === '23503') {
            return resposta.status(400).json({ mensagem: 'Referência inválida.' })
        }

        if (erro?.code === '23502') {
            return resposta.status(400).json({ mensagem: 'Campo obrigatório não informado.' })
        }

        return resposta.status(500).json({ mensagem: `Erro ao ${acao}.` })
    }
}

export default tratarErro
