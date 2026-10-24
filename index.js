import app from './src/app.js'

// No Render a porta é definida pela variável de ambiente PORT
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(`Servidor iniciado na porta ${PORT}`)
})
