import { Router } from 'express'
import * as controlador from '../controlador/turma-controlador.js'

const router = Router()

router.get('/turmas', controlador.listar)
router.post('/turmas', controlador.criar)
router.put('/turmas/:id', controlador.editar)
router.delete('/turmas/:id', controlador.deletar)

export const turmasRoutes = router