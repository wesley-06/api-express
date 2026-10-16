import express from 'express'
import { alunosRoutes } from './rotas/alunos.js'
import { professoresRoutes } from './rotas/professor.js'
import { disciplinasRoutes } from './rotas/disciplinas.js'
import { turmasRoutes } from './rotas/turmas.js'
import { matriculasRoutes } from './rotas/matricula.js'

const app = express()

app.use(express.json())
app.use(alunosRoutes)
app.use(professoresRoutes)
app.use(disciplinasRoutes)
app.use(turmasRoutes)
app.use(matriculasRoutes)

export default app
