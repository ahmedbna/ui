import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Table, TableColumn } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
  avatar?: string;
  joinDate: string;
  status: 'Active' | 'On Leave' | 'Terminated';
}

const employees: Employee[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    department: 'Engineering',
    salary: 95000,
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
    joinDate: '2022-01-15',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Mike Chen',
    email: 'mike.c@company.com',
    department: 'Design',
    salary: 78000,
    joinDate: '2023-03-20',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Emma Davis',
    email: 'emma.d@company.com',
    department: 'Marketing',
    salary: 65000,
    avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
    joinDate: '2021-11-08',
    status: 'On Leave',
  },
  {
    id: 4,
    name: 'James Wilson',
    email: 'james.w@company.com',
    department: 'Sales',
    salary: 72000,
    joinDate: '2020-09-12',
    status: 'Terminated',
  },
];

const columns: TableColumn<Employee>[] = [
  {
    id: 'employee',
    header: 'Employee',
    accessorKey: 'name',
    sortable: true,
    filterable: true,
    minWidth: 200,
    cell: (value, row) => (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar size={32}>
          {row.avatar && <AvatarImage source={{ uri: row.avatar }} />}
          <AvatarFallback>
            {row.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <View>
          <Text variant='body' style={{ fontWeight: '600' }}>
            {row.name}
          </Text>
          <Text variant='caption' style={{ opacity: 0.7 }}>
            {row.email}
          </Text>
        </View>
      </View>
    ),
  },
  {
    id: 'department',
    header: 'Department',
    accessorKey: 'department',
    sortable: true,
    filterable: true,
    minWidth: 120,
  },
  {
    id: 'salary',
    header: 'Salary',
    accessorKey: 'salary',
    sortable: true,
    align: 'right',
    minWidth: 120,
    cell: (value) => (
      <Text variant='body' style={{ fontWeight: '600' }}>
        ${value.toLocaleString()}
      </Text>
    ),
  },
  {
    id: 'joinDate',
    header: 'Join Date',
    accessorKey: 'joinDate',
    sortable: true,
    align: 'center',
    minWidth: 120,
    cell: (value) => new Date(value).toLocaleDateString(),
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    sortable: true,
    filterable: true,
    align: 'center',
    minWidth: 120,
    cell: (value) => (
      <Badge
        variant={
          value === 'Active'
            ? 'default'
            : value === 'On Leave'
            ? 'secondary'
            : 'destructive'
        }
      >
        {value}
      </Badge>
    ),
  },
];

export function TableCustomCells() {
  return (
    <Table
      data={employees}
      columns={columns}
      pageSize={3}
      searchPlaceholder='Search employees...'
    />
  );
}
