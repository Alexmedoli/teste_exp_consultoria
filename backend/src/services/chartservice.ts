/**
 * Organiza os dados para um gráfico de pizza.
 * Agrupa os valores por tipo e calcula a soma dos valores correspondentes.
 * @param data Array de objetos contendo os dados a serem organizados.
 * @returns Um objeto onde as chaves são os tipos e os valores são as somas dos valores correspondentes.
 */
export const organizePieChartData = (data: any[]) => {
    const result = data.reduce((acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + item.value;
        return acc;
    }, {});
    return result;
};

/**
 * Organiza os dados para um gráfico de linha.
 * Ordena os dados pela data e retorna um array de objetos contendo a data e o valor.
 * @param data Array de objetos contendo os dados a serem organizados.
 * @returns Um array de objetos contendo a data e o valor, ordenados por data.
 */
export const organizeLineChartData = (data: any[]) => {
    return data.sort((a, b) => a.date - b.date).map(item => ({
        date: item.date,
        value: item.value,
    }));
};

/**
 * Organiza os dados para um gráfico de coluna.
 * Seleciona apenas os campos 'type' e 'value' de cada objeto de dados.
 * @param data Array de objetos contendo os dados a serem organizados.
 * @returns Um array de objetos contendo o tipo e o valor de cada objeto de dados.
 */
export const organizeColumnChartData = (data: any[]) => {
    return data.map(item => ({
        type: item.type,
        value: item.value,
    }));
};

export default {
    organizePieChartData,
    organizeLineChartData,
    organizeColumnChartData
};