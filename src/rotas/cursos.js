import { Router } from 'express'
import * as controlador from '../controlador/curso-controlador.js'

const router = Router()

router.get('/cursos', controlador.listar)
router.post('/cursos', controlador.criar)
router.put('/cursos/:id', controlador.editar)
router.delete('/cursos/:id', controlador.deletar)

export const cursosRoutes = router