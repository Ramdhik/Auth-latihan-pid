import Navbar from '@/components/ui/navbar';
import Head from 'next/head';
import DataTable from '@/components/dataTable';
export default function CekOngkir() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <meta name="description" content="Display data from RajaOngkir API" />
      <main className="p-4">
        <DataTable />
      </main>
    </div>
  );
}
