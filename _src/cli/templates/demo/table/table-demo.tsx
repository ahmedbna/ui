import { Table, TableColumn } from '@/components/ui/table';
import React from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

const sampleData: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Manager',
    status: 'Inactive',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'User',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'Admin',
    status: 'Active',
  },
];

const columns: TableColumn<User>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
    sortable: true,
    filterable: true,
  },
  {
    id: 'email',
    header: 'Email',
    accessorKey: 'email',
    sortable: true,
    filterable: true,
  },
  {
    id: 'role',
    header: 'Role',
    accessorKey: 'role',
    sortable: true,
    filterable: true,
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    sortable: true,
    filterable: true,
  },
];

export function TableDemo() {
  return (
    <Table
      data={sampleData}
      columns={columns}
      pageSize={5}
      searchPlaceholder='Search users...'
    />
  );
}
