import request from 'supertest';
import { prisma } from '../../src/server';
import app from '../../src/server'; // Importe seu app express aqui

describe('Chart API', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await prisma.chartData.deleteMany();
  });

  test('POST /api/v1/chart should create a new chart data', async () => {
    const response = await request(app)
      .post('/api/v1/chart')
      .send({
        type: 'A',
        value: 100,
        date: '2023-06-01'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.type).toBe('A');
  });

  test('GET /api/v1/chart/:chartType should return organized chart data', async () => {
    await prisma.chartData.createMany({
      data: [
        { type: 'A', value: 10, date: new Date('2023-06-01') },
        { type: 'B', value: 20, date: new Date('2023-06-02') },
        { type: 'A', value: 30, date: new Date('2023-06-03') },
      ],
    });

    const response = await request(app)
      .get('/api/v1/chart/pie')
      .query({
        startDate: '2023-06-01',
        endDate: '2023-06-03'
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { type: 'A', value: 40 },
      { type: 'B', value: 20 },
    ]);
  });

  test('PUT /api/v1/chart should update chart data', async () => {
    const newChart = await prisma.chartData.create({
      data: {
        type: 'A',
        value: 10,
        date: new Date('2023-06-01'),
      }
    });

    const response = await request(app)
      .put('/api/v1/chart')
      .send({
        id: newChart.id,
        type: 'B',
        value: 50
      });

    expect(response.status).toBe(200);
    expect(response.body.type).toBe('B');
    expect(response.body.value).toBe(50);
  });

  test('DELETE /api/v1/chart should delete chart data', async () => {
    const newChart = await prisma.chartData.create({
      data: {
        type: 'A',
        value: 10,
        date: new Date('2023-06-01'),
      }
    });

    const response = await request(app)
      .delete('/api/v1/chart')
      .send({
        id: newChart.id,
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(newChart.id);
  });
});
