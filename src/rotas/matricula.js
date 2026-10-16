import { Router } from 'express'
import * as controlador from '../controlador/matricula-controlador.js'

const router = Router()

router.get('/matriculas', controlador.listar)
router.post('/matriculas', controlador.criar)
router.delete('/matriculas/:turma_id/:aluno_id', controlador.deletar)

export const matriculasRoutes = router