import { Table, TableColumn } from '@/components/ui/table';
import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  rating: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Laptop Pro',
    price: 1299.99,
    category: 'Electronics',
    inStock: true,
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    price: 29.99,
    category: 'Electronics',
    inStock: true,
    rating: 4.2,
  },
  {
    id: 3,
    name: 'Coffee Mug',
    price: 12.99,
    category: 'Kitchen',
    inStock: false,
    rating: 4.0,
  },
  {
    id: 4,
    name: 'Desk Chair',
    price: 199.99,
    category: 'Furniture',
    inStock: true,
    rating: 4.7,
  },
  {
    id: 5,
    name: 'Notebook',
    price: 5.99,
    category: 'Office',
    inStock: true,
    rating: 3.8,
  },
  {
    id: 6,
    name: 'Smartphone',
    price: 699.99,
    category: 'Electronics',
    inStock: true,
    rating: 4.3,
  },
];

const columns: TableColumn<Product>[] = [
  {
    id: 'name',
    header: 'Product Name',
    accessorKey: 'name',
    sortable: true,
    filterable: true,
    minWidth: 150,
  },
  {
    id: 'price',
    header: 'Price',
    accessorKey: 'price',
    sortable: true,
    align: 'right',
    cell: (value) => `$${value.toFixed(2)}`,
    minWidth: 100,
  },
  {
    id: 'category',
    header: 'Category',
    accessorKey: 'category',
    sortable: true,
    filterable: true,
    minWidth: 120,
  },
  {
    id: 'inStock',
    header: 'In Stock',
    accessorKey: 'inStock',
    sortable: true,
    align: 'center',
    cell: (value) => (value ? '✅' : '❌'),
    minWidth: 100,
  },
  {
    id: 'rating',
    header: 'Rating',
    accessorKey: 'rating',
    sortable: true,
    align: 'center',
    cell: (value) => `⭐ ${value}`,
    minWidth: 100,
  },
];

export function TableSortable() {
  return (
    <Table
      data={products}
      columns={columns}
      pageSize={4}
      searchPlaceholder='Search products...'
    />
  );
}
