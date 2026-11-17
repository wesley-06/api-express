const swaggerDocument = {
    openapi: '3.0.3',
    info: {
        title: 'API Escola',
        description: 'API didática para gerenciamento de cursos, alunos, disciplinas, professores e turmas.',
        version: '1.0.0',
    },
    servers: [{ url: '/', description: 'Servidor atual' }],
    tags: [
        { name: 'Alunos' },
        { name: 'Cursos' },
        { name: 'Disciplinas' },
        { name: 'Professores' },
        { name: 'Turmas' },
        { name: 'Matrículas' },
    ],
    components: {
        parameters: {
            Id: {
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'integer' },
            },
        },
        schemas: {
            Erro: {
                type: 'object',
                properties: {
                    mensagem: { type: 'string' },
                },
            },
            Aluno: {
                type: 'object',
                required: ['matricula', 'nome', 'email', 'nascimento'],
                properties: {
                    id: { type: 'integer' },
                    matricula: { type: 'string' },
                    nome: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    nascimento: { type: 'string', format: 'date-time' },
                    turmas: { type: 'array', items: { type: 'object' } },
                },
            },
            Curso: {
                type: 'object',
                required: ['nome', 'codigo'],
                properties: {
                    id: { type: 'integer' },
                    nome: { type: 'string' },
                    codigo: { type: 'string' },
                },
            },
            Disciplina: {
                type: 'object',
                required: ['nome', 'codigo'],
                properties: {
                    id: { type: 'integer' },
                    nome: { type: 'string' },
                    codigo: { type: 'string' },
                },
            },
            Professor: {
                type: 'object',
                required: ['matricula', 'nome', 'email', 'nascimento'],
                properties: {
                    id: { type: 'integer' },
                    matricula: { type: 'string' },
                    nome: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    nascimento: { type: 'string', format: 'date-time' },
                },
            },
            Turma: {
                type: 'object',
                required: ['nome', 'disciplina_id', 'professor_id'],
                properties: {
                    id: { type: 'integer' },
                    nome: { type: 'string' },
                    disciplina_id: { type: 'integer' },
                    professor_id: { type: 'integer' },
                },
            },
            Matricula: {
                type: 'object',
                required: ['turma_id', 'aluno_id'],
                properties: {
                    turma_id: { type: 'integer' },
                    aluno_id: { type: 'integer' },
                },
            },
        },
        responses: {
            BadRequest: {
                description: 'Dados ou referência inválida.',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } },
            },
            NotFound: {
                description: 'Registro não encontrado.',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } },
            },
            Conflict: {
                description: 'Registro duplicado.',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } },
            },
            InternalError: {
                description: 'Erro interno.',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } },
            },
        },
    },
    paths: {
        '/alunos': {
            get: {
                tags: ['Alunos'],
                summary: 'Lista os alunos',
                responses: { 200: { description: 'Lista de alunos.' } },
            },
            post: {
                tags: ['Alunos'],
                summary: 'Cria um aluno',
                requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Aluno' } } } },
                responses: { 201: { description: 'Aluno criado.' }, 400: { $ref: '#/components/responses/BadRequest' }, 409: { $ref: '#/components/responses/Conflict' } },
            },
        },
        '/alunos/{id}': {
            parameters: [{ $ref: '#/components/parameters/Id' }],
            put: {
                tags: ['Alunos'],
                summary: 'Edita um aluno',
                requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Aluno' } } } },
                responses: { 200: { description: 'Aluno editado.' }, 404: { $ref: '#/components/responses/NotFound' } },
            },
            delete: {
                tags: ['Alunos'],
                summary: 'Remove um aluno',
                responses: { 200: { description: 'Aluno removido.' }, 404: { $ref: '#/components/responses/NotFound' } },
            },
        },
        '/cursos': {
            get: { tags: ['Cursos'], summary: 'Lista os cursos', responses: { 200: { description: 'Lista de cursos.' } } },
            post: {
                tags: ['Cursos'],
                summary: 'Cria um curso',
                requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Curso' } } } },
                responses: { 201: { description: 'Curso criado.' }, 409: { $ref: '#/components/responses/Conflict' } },
            },
        },
        '/cursos/{id}': {
            parameters: [{ $ref: '#/components/parameters/Id' }],
            put: {
                tags: ['Cursos'],
                summary: 'Edita um curso',
                requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Curso' } } } },
                responses: { 200: { description: 'Curso editado.' }, 404: { $ref: '#/components/responses/NotFound' } },
            },
            delete: {
                tags: ['Cursos'],
                summary: 'Remove um curso',
                responses: { 200: { description: 'Curso removido.' }, 404: { $ref: '#/components/responses/NotFound' } },
            },
        },
        '/cursos/{id}/disciplinas': {
            parameters: [{ $ref: '#/components/parameters/Id' }],
            post: {
                tags: ['Cursos'],
                summary: 'Vincula uma disciplina ao curso',
                requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['disciplina_id'], properties: { disciplina_id: { type: 'integer' } } } } } },
                responses: { 200: { description: 'Disciplina vinculada.' }, 400: { $ref: '#/components/responses/BadRequest' } },
            },
        },
        '/cursos/{id}/disciplinas/{disciplina_id}': {
            parameters: [
                { $ref: '#/components/parameters/Id' },
                { name: 'disciplina_id', in: 'path', required: true, schema: { type: 'integer' } },
            ],
            delete: {
                tags: ['Cursos'],
                summary: 'Remove uma disciplina do curso',
                responses: { 200: { description: 'Disciplina removida.' }, 404: { $ref: '#/components/responses/NotFound' } },
            },
        },
        '/cursos/{id}/alunos': {
            parameters: [{ $ref: '#/components/parameters/Id' }],
            post: {
                tags: ['Cursos'],
                summary: 'Vincula um aluno ao curso',
                requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['aluno_id'], properties: { aluno_id: { type: 'integer' } } } } } },
                responses: { 201: { description: 'Aluno vinculado.' }, 400: { $ref: '#/components/responses/BadRequest' } },
            },
        },
        '/cursos/{id}/alunos/{aluno_id}': {
            parameters: [
                { $ref: '#/components/parameters/Id' },
                { name: 'aluno_id', in: 'path', required: true, schema: { type: 'integer' } },
            ],
            delete: {
                tags: ['Cursos'],
                summary: 'Remove um aluno do curso',
                responses: { 200: { description: 'Aluno removido.' }, 404: { $ref: '#/components/responses/NotFound' } },
            },
        },
        '/disciplinas': {
            get: { tags: ['Disciplinas'], summary: 'Lista as disciplinas', responses: { 200: { description: 'Lista de disciplinas.' } } },
            post: {
                tags: ['Disciplinas'],
                summary: 'Cria uma disciplina',
                requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Disciplina' } } } },
                responses: { 201: { description: 'Disciplina criada.' } },
            },
        },
        '/disciplinas/{id}': {
            parameters: [{ $ref: '#/components/parameters/Id' }],
            put: { tags: ['Disciplinas'], summary: 'Edita uma disciplina', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Disciplina' } } } }, responses: { 200: { description: 'Disciplina editada.' }, 404: { $ref: '#/components/responses/NotFound' } } },
            delete: { tags: ['Disciplinas'], summary: 'Remove uma disciplina', responses: { 200: { description: 'Disciplina removida.' }, 404: { $ref: '#/components/responses/NotFound' } } },
        },
        '/professores': {
            get: { tags: ['Professores'], summary: 'Lista os professores', responses: { 200: { description: 'Lista de professores.' } } },
            post: { tags: ['Professores'], summary: 'Cria um professor', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Professor' } } } }, responses: { 201: { description: 'Professor criado.' } } },
        },
        '/professores/{id}': {
            parameters: [{ $ref: '#/components/parameters/Id' }],
            put: { tags: ['Professores'], summary: 'Edita um professor', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Professor' } } } }, responses: { 200: { description: 'Professor editado.' }, 404: { $ref: '#/components/responses/NotFound' } } },
            delete: { tags: ['Professores'], summary: 'Remove um professor', responses: { 200: { description: 'Professor removido.' }, 404: { $ref: '#/components/responses/NotFound' } } },
        },
        '/turmas': {
            get: { tags: ['Turmas'], summary: 'Lista as turmas', responses: { 200: { description: 'Lista de turmas.' } } },
            post: { tags: ['Turmas'], summary: 'Cria uma turma', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Turma' } } } }, responses: { 201: { description: 'Turma criada.' } } },
        },
        '/turmas/{id}': {
            parameters: [{ $ref: '#/components/parameters/Id' }],
            put: { tags: ['Turmas'], summary: 'Edita uma turma', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Turma' } } } }, responses: { 200: { description: 'Turma editada.' }, 404: { $ref: '#/components/responses/NotFound' } } },
            delete: { tags: ['Turmas'], summary: 'Remove uma turma', responses: { 200: { description: 'Turma removida.' }, 404: { $ref: '#/components/responses/NotFound' } } },
        },
        '/matriculas': {
            get: { tags: ['Matrículas'], summary: 'Lista as matrículas', responses: { 200: { description: 'Lista de vínculos turma-aluno.' } } },
            post: { tags: ['Matrículas'], summary: 'Matricula um aluno em uma turma', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Matricula' } } } }, responses: { 201: { description: 'Matrícula criada.' }, 400: { $ref: '#/components/responses/BadRequest' } } },
        },
        '/matriculas/{turma_id}/{aluno_id}': {
            parameters: [
                { name: 'turma_id', in: 'path', required: true, schema: { type: 'integer' } },
                { name: 'aluno_id', in: 'path', required: true, schema: { type: 'integer' } },
            ],
            delete: { tags: ['Matrículas'], summary: 'Remove uma matrícula', responses: { 200: { description: 'Matrícula removida.' }, 404: { $ref: '#/components/responses/NotFound' } } },
        },
    },
}

export default swaggerDocument
