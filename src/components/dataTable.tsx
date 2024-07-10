// components/DataTable.tsx
'use client';
import React, { useEffect, useState } from 'react';

interface Cost {
  value: number;
  etd: string;
  note: string;
}

interface CourierCost {
  service: string;
  description: string;
  cost: Cost[];
}

interface ApiResponse {
  rajaongkir: {
    results: [
      {
        code: string;
        name: string;
        costs: CourierCost[];
      }
    ];
  };
}

const DataTable: React.FC = () => {
  const [data, setData] = useState<CourierCost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/route');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: ApiResponse = await response.json();
        setData(result.rajaongkir.results[0].costs);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-blue-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto py-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Service
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cost
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ETD
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.service}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.description}</td>
              {item.cost.map((cost, idx) => (
                <React.Fragment key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cost.value}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cost.etd}</td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
