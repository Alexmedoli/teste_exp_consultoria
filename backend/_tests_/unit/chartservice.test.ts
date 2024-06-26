import { organizePieChartData, organizeLineChartData, organizeColumnChartData } from '../../src/services/chartservice';

describe('Chart Service', () => {
  const sampleData = [
    { type: 'A', value: 10, date: new Date('2023-06-01') },
    { type: 'B', value: 20, date: new Date('2023-06-02') },
    { type: 'A', value: 30, date: new Date('2023-06-03') },
  ];

  test('organizePieChartData should group data by type and sum values', () => {
    const result = organizePieChartData(sampleData);
    expect(result).toEqual([
      { type: 'A', value: 40 },
      { type: 'B', value: 20 },
    ]);
  });

  test('organizeLineChartData should sort data by date', () => {
    const result = organizeLineChartData(sampleData);
    expect(result).toEqual([
      { date: new Date('2023-06-01'), value: 10 },
      { date: new Date('2023-06-02'), value: 20 },
      { date: new Date('2023-06-03'), value: 30 },
    ]);
  });

  test('organizeColumnChartData should map data to type and value', () => {
    const result = organizeColumnChartData(sampleData);
    expect(result).toEqual([
      { type: 'A', value: 10 },
      { type: 'B', value: 20 },
      { type: 'A', value: 30 },
    ]);
  });
});
