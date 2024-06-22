import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getFilteredData = async (chartType: string, startDate: Date, endDate: Date) => {
  const data = await prisma.data.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  // Aqui você pode processar os dados de acordo com o tipo de gráfico
  switch (chartType) {
    case 'pie':
      // Processar dados para gráfico de pizza
      return processPieChartData(data);
    case 'line':
      // Processar dados para gráfico de linha
      return processLineChartData(data);
    default:
      throw new Error('Chart type not supported');
  }
};

const processPieChartData = (data: any) => {
  // Implementar lógica para processar dados para gráfico de pizza
};

const processLineChartData = (data: any) => {
  // Implementar lógica para processar dados para gráfico de linha
};