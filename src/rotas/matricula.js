import { Router } from 'express'
import * as controlador from '../controlador/turma-controlador.js'

const router = Router()

router.get('/matriculas', controlador.listar)
router.post('/matriculas', controlador.criar)
router.put('/matriculas/:id', controlador.editar)
router.delete('/matriculas/:id', controlador.deletar)

export const matriculasRoutes = router