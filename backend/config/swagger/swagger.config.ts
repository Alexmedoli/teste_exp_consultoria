import {Express, Request, Response} from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from'swagger-ui-express'
import {version} from '../../package.json'


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentação do teste para smartnewsystem',
      version,
      description: 'Documentação da API utilizando Swagger',
    },
    servers: [
        {
            url: 'http://localhost:8080/api/v1/chart',
            description: 'Servidor de Desenvolvimento'
        },
    ],
  },
  apis: ['./src/routes/chart.route.ts'], // Caminho para os arquivos que contêm as rotas da sua API
};


export const swaggerSpec = swaggerJSDoc(swaggerOptions)

function swaggerDocs (app: Express, port: number){
    // Swagger page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Docs em JSON
    app.get('docs.json', (req: Request, res: Response) =>{
        res.setHeader('Content-type', 'application/json');
        res.send(swaggerSpec);
        
    });
    console.log(`Docs publicados em http://localhost:${port}/docs`);
}

export default swaggerDocs;
