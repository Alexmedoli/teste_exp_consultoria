import { organizePieChartData, organizeColumnChartData, organizeLineChartData } from "../services/chartservice";
import { Request, Response } from "express";
import { prisma } from "../server";
import { isError } from "util";


/**
 * Função para inserir dados no banco de dados.
 * @param req - Objeto da requisição do Express.
 * @param res - Objeto da resposta do Express.
 */
export const createData = async (req: Request, res: Response) => {
    try {
        const { type, value, date } = req.body;

        if (!type || !value || !date) {
            return res.status(400).json({ error: 'Por favor, insira tipo, valor e data.' });
        }

        const newData = await prisma.chartData.create({
            data: {
                type,
                value,
                date: new Date(date),
            }
        })

        res.status(200).json(newData);
    } catch (e) {
        if (isError(e)) {
            res.status(500).json({ error: e.message });
        } else {
            res.status(500).json({ error: 'Erro no servidor' })
        }
    }
};

/**
 * Função para obter charts por tipo e filtrados por data.
 * @param req - Objeto da requisição do Express.
 * @param res - Objeto da resposta do Express.
 */
export const getChart = async (req: Request, res: Response) => {
    try {
        const { chartType } = req.params;
        let { startDate, endDate } = req.query;

        startDate = startDate ? `${startDate}T00:00:00.000Z` : undefined;
        endDate = endDate ? `${endDate}T23:59:59.999Z` : undefined;

        const charts = await prisma.chartData.findMany({
            where: {
                date: {
                    gte: new Date(startDate as string),
                    lte: new Date(endDate as string),
                }
            },
        });


        let organizedData;

        if (chartType === 'pie') {
            organizedData = organizePieChartData(charts);
        } else if (chartType === 'column') {
            organizedData = organizeColumnChartData(charts);
        } else if (chartType === 'line') {
            organizedData = organizeLineChartData(charts);
        } else {
            return res.status(400).json({ error: 'tipo de gráfico não suportado' })
        }

        res.status(200).json(organizedData);
    } catch (e) {
        if (isError(e)) {
            res.status(500).json({ error: e.message });
        } else {
            res.status(500).json({ error: "Um erro desconhecido ocorreu" })
        }
    }
};

/**
 * Função para atualizar um chart existente.
 * @param req - Objeto da requisição do Express.
 * @param res - Objeto da resposta do Express.
 */
export const updateChart = async (req: Request, res: Response) => {
    try {
        const { id, type, value, startDate, endDate } = req.body;
        const updatedChart = await prisma.chartData.update({
            where: { id: Number(id) },
            data: {
                type,
                value,
            },
        });
        res.status(200).json(updatedChart);
    } catch (e) {
        if (isError(e)) {
            res.status(500).json({ error: e.message });
        } else {
            res.status(500).json({ error: 'Um erro desconhecido ocorreu' })
        }
    }
};

/**
 * Função para deletar um dado no banco.
 * @param req - Objeto da requisição do Express.
 * @param res - Objeto da resposta do Express.
 */
export const deleteChart = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const deletedChart = await prisma.chartData.delete({
            where: { id: Number(id) },
        });
        res.status(200).json(deletedChart);
    } catch (e) {
        if (isError(e)) {
            res.status(500).json({ error: e.message });
        } else {
            res.status(500).json({ error: 'Um erro desconhecido ocorreu' })
        }
    }
};

export default {
    createData,
    getChart,
    updateChart,
    deleteChart,
};