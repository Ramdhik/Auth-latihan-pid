// pages/api/ongkir.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { origin, destination, weight, courier } = req.body;

  try {
    const response = await fetch('https://api.rajaongkir.com/starter/cost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        key: process.env.RAJAONGKIR_API_KEY || '71c968f2ad9c5bf619930c7c351a1e2b',
      },
      body: JSON.stringify({
        origin: origin || '501', // Default origin
        destination: destination || '114', // Default destination
        weight: weight || 1700, // Default weight
        courier: courier || 'jne', // Default courier
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      res.status(response.status).json({ error: data });
    } else {
      res.status(200).json(data);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
