import { Table, TableColumn } from '@/components/ui/table';
import React from 'react';

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  date: string;
  status: 'Pending' | 'Completed' | 'Cancelled';
}

// Generate sample data
const generateOrders = (count: number): Order[] => {
  const customers = [
    'John Doe',
    'Jane Smith',
    'Bob Johnson',
    'Alice Brown',
    'Charlie Wilson',
    'Diana Ross',
    'Frank Miller',
    'Grace Lee',
  ];
  const products = [
    'Laptop',
    'Mouse',
    'Keyboard',
    'Monitor',
    'Headphones',
    'Webcam',
    'Tablet',
    'Phone',
  ];
  const statuses: Order['status'][] = ['Pending', 'Completed', 'Cancelled'];

  return Array.from({ length: count }, (_, i) => ({
    id: `ORD-${String(i + 1).padStart(4, '0')}`,
    customer: customers[i % customers.length],
    product: products[i % products.length],
    amount: Math.floor(Math.random() * 1000) + 50,
    date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
};

const orders = generateOrders(50);

const columns: TableColumn<Order>[] = [
  {
    id: 'id',
    header: 'Order ID',
    accessorKey: 'id',
    sortable: true,
    filterable: true,
    minWidth: 120,
  },
  {
    id: 'customer',
    header: 'Customer',
    accessorKey: 'customer',
    sortable: true,
    filterable: true,
    minWidth: 150,
  },
  {
    id: 'product',
    header: 'Product',
    accessorKey: 'product',
    sortable: true,
    filterable: true,
    minWidth: 120,
  },
  {
    id: 'amount',
    header: 'Amount',
    accessorKey: 'amount',
    sortable: true,
    align: 'right',
    minWidth: 100,
    cell: (value) => `$${value.toFixed(2)}`,
  },
  {
    id: 'date',
    header: 'Date',
    accessorKey: 'date',
    sortable: true,
    align: 'center',
    minWidth: 120,
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    sortable: true,
    filterable: true,
    align: 'center',
    minWidth: 120,
  },
];

export function TablePagination() {
  return (
    <Table
      data={orders}
      columns={columns}
      pageSize={8}
      searchPlaceholder='Search orders...'
      pagination={true}
    />
  );
}
