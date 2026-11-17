import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { alunosRoutes } from './rotas/alunos.js'
import { professoresRoutes } from './rotas/professor.js'
import { disciplinasRoutes } from './rotas/disciplinas.js'
import { turmasRoutes } from './rotas/turmas.js'
import { matriculasRoutes } from './rotas/matricula.js'
import { cursosRoutes } from './rotas/cursos.js'
import swaggerDocument from './swagger.js'

const app = express()

app.use(express.json())

app.get('/docs/swagger.json', (pedido, resposta) => {
    resposta.json(swaggerDocument)
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customSiteTitle: 'API Escola - Documentação',
}))

// Rota raiz: usada como health check pelo Render
app.get('/', (pedido, resposta) => {
    resposta.json({ status: 'ok', mensagem: 'API Escola no ar!' })
})

app.use(alunosRoutes)
app.use(professoresRoutes)
app.use(disciplinasRoutes)
app.use(turmasRoutes)
app.use(matriculasRoutes)
app.use(cursosRoutes)

export default app
