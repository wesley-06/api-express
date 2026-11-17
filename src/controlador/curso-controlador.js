import banco from '../dados/db.js'
import tratarErro from './erros.js'

const listar = tratarErro('listar cursos')(async (pedido, resposta) => {
    const { rows } = await banco.query(`
        SELECT c.*,
            COALESCE((
                SELECT json_agg(json_build_object(
                    'id', d.id,
                    'nome', d.nome,
                    'codigo', d.codigo
                ) ORDER BY d.id)
                FROM curso_disciplinas cd
                JOIN disciplinas d ON d.id = cd.disciplina_id
                WHERE cd.curso_id = c.id
            ), '[]') AS disciplinas,
            COALESCE((
                SELECT json_agg(json_build_object(
                    'id', a.id,
                    'matricula', a.matricula,
                    'nome', a.nome,
                    'email', a.email,
                    'nascimento', a.nascimento
                ) ORDER BY a.id)
                FROM aluno_cursos ac
                JOIN alunos a ON a.id = ac.aluno_id
                WHERE ac.curso_id = c.id
            ), '[]') AS alunos
        FROM cursos c
        ORDER BY c.id
    `)
    resposta.json(rows)
})

const criar = tratarErro('criar curso')(async (pedido, resposta) => {
    const { nome, codigo } = pedido.body
    const { rows } = await banco.query(
        'INSERT INTO cursos (nome, codigo) VALUES ($1,$2) RETURNING *',
        [nome, codigo]
    )

    resposta.status(201).json(rows[0])
})

const editar = tratarErro('editar curso')(async (pedido, resposta) => {
    const { nome, codigo } = pedido.body
    const { id } = pedido.params

    const resultado = await banco.query(
        'UPDATE cursos SET nome = $1, codigo = $2 WHERE id = $3',
        [nome, codigo, id])

    if (resultado.rowCount === 0) {
        return resposta.status(404).json({ mensagem: 'Curso não encontrado!' })
    }

    resposta.json({ mensagem: 'Curso editado com sucesso!' })
})

const deletar = tratarErro('deletar curso')(async (pedido, resposta) => {
    const { id } = pedido.params
    const resultado = await banco.query('DELETE FROM cursos WHERE id = $1', [id])

    if (resultado.rowCount === 0) {
        return resposta.status(404).json({ mensagem: 'Curso não encontrado!' })
    }

    resposta.json({ mensagem: 'Curso deletado com sucesso!' })
})

// Vincula uma disciplina ao curso (tabela curso_disciplinas)
const adicionarDisciplina = tratarErro('vincular disciplina ao curso')(async (pedido, resposta) => {
    const { id } = pedido.params
    const { disciplina_id } = pedido.body

    const { rows } = await banco.query(
        'INSERT INTO curso_disciplinas (curso_id, disciplina_id) VALUES ($1, $2) RETURNING *',
        [id, disciplina_id]
    )

    resposta.json(rows[0])
})

// Remove o vínculo entre a disciplina e o curso
const removerDisciplina = tratarErro('remover disciplina do curso')(async (pedido, resposta) => {
    const { id, disciplina_id } = pedido.params

    const resultado = await banco.query(
        'DELETE FROM curso_disciplinas WHERE curso_id = $1 AND disciplina_id = $2',
        [id, disciplina_id]
    )

    if (resultado.rowCount === 0) {
        return resposta.status(404).json({ mensagem: 'Disciplina não vinculada a este curso!' })
    }

    resposta.json({ mensagem: 'Disciplina removida do curso com sucesso!' })
})

// Vincula um aluno ao curso (tabela aluno_cursos)
const adicionarAluno = tratarErro('vincular aluno ao curso')(async (pedido, resposta) => {
    const { id } = pedido.params
    const { aluno_id } = pedido.body

    const { rows } = await banco.query(
        'INSERT INTO aluno_cursos (aluno_id, curso_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *',
        [aluno_id, id]
    )

    resposta.status(201).json(rows[0] ?? { aluno_id: Number(aluno_id), curso_id: Number(id) })
})

// Remove o vínculo entre o aluno e o curso
const removerAluno = tratarErro('remover aluno do curso')(async (pedido, resposta) => {
    const { id, aluno_id } = pedido.params
    const resultado = await banco.query(
        'DELETE FROM aluno_cursos WHERE curso_id = $1 AND aluno_id = $2',
        [id, aluno_id]
    )

    if (resultado.rowCount === 0) {
        return resposta.status(404).json({ mensagem: 'Aluno não vinculado a este curso!' })
    }

    resposta.json({ mensagem: 'Aluno removido do curso com sucesso!' })
})

export {
    listar,
    criar,
    editar,
    deletar,
    adicionarDisciplina,
    removerDisciplina,
    adicionarAluno,
    removerAluno,
}
