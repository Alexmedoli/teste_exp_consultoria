import express from "express";
import {createData, getChart, updateChart,deleteChart} from "../controllers/chart.controller";

const router = express.Router();

/**
 * @swagger
 * /api/v1/chart/{chartType}:
 *   get:
 *     summary: Retorna os dados dos gráficos do tipo especificado.
 *     tags:
 *       - Charts
 *     parameters:
 *       - in: path
 *         name: chartType
 *         required: true
 *         schema:
 *           type: string
 *         description: Tipo do gráfico (line, pie, column).
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Data de início para filtrar os dados.
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Data de fim para filtrar os dados.
 *     responses:
 *       '200':
 *         description: Sucesso. Retorna os dados dos gráficos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: '2023-01-01T00:00:00.000Z'
 *                   value:
 *                     type: number
 *                     example: 50
 *                 example:
 *                   - date: '2023-01-01T00:00:00.000Z'
 *                     value: 50
 *                   - date: '2023-01-01T00:00:00.000Z'
 *                     value: 50
 *                   - date: '2023-01-01T00:00:00.000Z'
 *                     value: 21
 *                   - date: '2023-01-01T00:00:00.000Z'
 *                     value: 51
 *                   - date: '2023-01-01T00:00:00.000Z'
 *                     value: 95
 *                   - date: '2023-01-01T00:00:00.000Z'
 *                     value: 95
 *       '400':
 *         description: Erro de requisição. Parâmetros inválidos.
 *       '500':
 *         description: Erro no servidor.
 */
router.get('/:chartType', getChart);

/**
 * @openapi
 * /api/v1/chart:
 *   post:
 *     summary: Cria um novo dado para o gráfico.
 *     tags:
 *       - Charts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *     responses:
 *       '201':
 *         description: Sucesso. Retorna o dado criado.
 *         content:
 *           application/json:
 *             schema:
 *       '400':
 *         description: Erro de requisição. Body inválido.
 *       '500':
 *         description: Erro no servidor.
 */
router.post('/', createData);


/**
 * @openapi
 * /api/v1/chart:
 *   put:
 *     summary: Atualiza um dado existente do gráfico.
 *     tags:
 *       - Charts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateChartData'
 *     responses:
 *       '200':
 *         description: Sucesso. Retorna o dado atualizado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChartData'
 */
router.put('/', updateChart);


/**
 * @openapi
 * /api/v1/chart:
 *   delete:
 *     summary: Deleta um dado existente no banco de dados.
 *     tags:
 *       - Charts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *     responses:
 *       '200':
 *         description: Sucesso. Retorna o dado deletado.
 *         content:
 *           application/json:
 *             schema:
 */
router.delete('/', deleteChart);


export default router;