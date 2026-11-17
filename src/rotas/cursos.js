import { Router } from 'express'
import * as controlador from '../controlador/curso-controlador.js'

const router = Router()

router.get('/cursos', controlador.listar)
router.post('/cursos', controlador.criar)
router.put('/cursos/:id', controlador.editar)
router.delete('/cursos/:id', controlador.deletar)
router.post('/cursos/:id/disciplinas', controlador.adicionarDisciplina)
router.delete('/cursos/:id/disciplinas/:disciplina_id', controlador.removerDisciplina)
router.post('/cursos/:id/alunos', controlador.adicionarAluno)
router.delete('/cursos/:id/alunos/:aluno_id', controlador.removerAluno)

export const cursosRoutes = router
