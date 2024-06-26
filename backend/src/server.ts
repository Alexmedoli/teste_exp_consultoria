import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import PostRouter from './routes/chart.route';
import swaggerDocs from '../config/swagger/swagger.config';
import cors from 'cors'; 

export const prisma = new PrismaClient();
const app = express();
const port = 8080;



async function main() {
  app.use(express.json());

  app.use(cors());
  
  swaggerDocs(app, port);


  // Middleware para servir a documentação Swagger UI
  //app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Registro de todas as rotas de API
  app.use('/api/v1/chart', PostRouter);

  // Tratamento para rotas não registradas
  app.all('*', (req: Request, res: Response) => {
    res.status(404).json({ error: `A rota ${req.originalUrl} não foi encontrada` });
  });

  app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}`);
  });
 
}

main()
  .then(async () => {
    await prisma.$connect();
    console.log('Conectado ao banco de dados');
  })
  .catch(async (e) => {
    console.error('Erro ao conectar ao banco de dados:', e);
    await prisma.$disconnect();
    process.exit(1);
  });

