# Sumário
Este repositório estabelece o backend para um aplicativo de processamento de dados com o objetivo de produzir gráficos.

# Documentação
A documentação deste repositório é gerada via comentários em typedoc. Para mais informações sobre a ferramenta e como utilizá-la, acesse Typedoc. Toda a documentação gerada é armazenada no diretório `/docs`.

# Setup
### Banco de dados
O servidor depende de uma conexão com um banco de dados MySQL. Crie uma conexão e uma database e utilize `.env.example` como referência para configurar seu ambiente. Crie um arquivo `.env` no backend com as seguintes variáveis de ambiente:

Variável de ambiente:
```env
DATABASE_URL="mysql://admin:<password>@localhost:3306/diagram_data"
```

# Instalação
Execute os seguintes comandos para configurar e iniciar o backend:

### Instalar dependências
Utilize este comando para realizar o download e instalação de todas as dependências do projeto listadas no arquivo `package.json`:

```bash
yarn add
```

### Iniciar o servidor
Este comando iniciará o servidor desta aplicação a partir do arquivo `src/server.ts` na url `http://localhost:8080/api/v1/chart`, a porta em uso atualmente é a 8080.
O arquivo server.ts também iniciará a conexão com o banco de dados e nossa página de documentação de api swagger na porta `http://localhost:8080/docs`.

Comando:
``` bash
yarn start
```

Script:
```json
"start": "ts-node-dev --respawn --transpile-only --exit-child src/server.ts",
```

### prisma studio
Após executar o servidor, é possível acessar os modelos através do prisma studio, para isso, utilize o seguinte comando:

Comando:
```bash
npx prisma studio
```

# Migrações do vanco de dados

### Criar migrações
Utilize este comando para sincronizar o banco de dados com os modelos do Prisma. Ele criará arquivos no diretório `./config/prisma/migrations` com base na configuração presente no `schema.prisma`. Execute este comando sempre que houver alterações no schema:

Comando:
``` bash
yarn db:migrate
```

Script:
``` json
"db:migrate": "npx prisma migrate dev --name user-entity --create-only && prisma generate"
```

### Aplicar migrações
Depois de gerar os arquivos de migração, o script `db:push` sincronizará as mudanças do schema com o banco de dados. Utilize este comando sempre que precisar aplicar mudanças no modelo ao banco de dados:

Comando:
``` bash
yarn db:push
```

Script:
``` json
"db:push": "npx prisma db push"
```

# Testes
O comando a seguir irá realizar todos testes unitários e de integração contidos no diretório `_tests_`.

Comando:
``` bash
yarn test
```

Script:
```json
"test": "jest",
```

# Gerar documentação
O script docs gera a documentação do backend utilizando o typedoc. Todos os comentários no diretório `/src/*.ts` são processados e a documentação em HTML é gerada no diretório `/docs`:

Comando:
```bash
yarn docs
```

Script:
```json
"docs": "typedoc"
```