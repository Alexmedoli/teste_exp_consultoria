import { Request, Response } from 'express';
import { getFilteredData } from '../services/dataService';

export const getData = async (req: Request, res: Response) => {
  const { chartType } = req.params;
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'Please provide startDate and endDate' });
  }

  try {
    const data = await getFilteredData(chartType, new Date(startDate as string), new Date(endDate as string));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};