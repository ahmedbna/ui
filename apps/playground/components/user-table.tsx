// Example usage and documentation for Table component

import { Table, TableColumn } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

// Sample data types
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  avatar?: string;
  score: number;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  featured: boolean;
}

// Sample data
const sampleUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15',
    score: 95,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2024-01-14',
    score: 87,
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'moderator',
    status: 'inactive',
    lastLogin: '2024-01-10',
    score: 92,
  },
  // Add more sample data as needed...
];

const sampleProducts: Product[] = [
  {
    id: 'P001',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 199.99,
    stock: 45,
    rating: 4.5,
    featured: true,
  },
  {
    id: 'P002',
    name: 'Smart Watch',
    category: 'Electronics',
    price: 299.99,
    stock: 23,
    rating: 4.2,
    featured: false,
  },
  // Add more sample data as needed...
];

// Example 1: Basic User Table
export function BasicUserTable() {
  const userColumns: TableColumn<User>[] = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      sortable: true,
      filterable: true,
      cell: (value, row) => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Avatar would go here if you have the component */}
          <Text style={{ fontWeight: '500' }}>{value}</Text>
        </View>
      ),
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
      sortable: true,
      filterable: true,
      cell: (value) => <Text style={{ color: '#6B7280' }}>{value}</Text>,
    },
    {
      id: 'role',
      header: 'Role',
      accessorKey: 'role',
      sortable: true,
      cell: (value) => (
        <Text
          style={{
            textTransform: 'capitalize',
            fontWeight: '500',
            color:
              value === 'admin'
                ? '#EF4444'
                : value === 'moderator'
                  ? '#F59E0B'
                  : '#10B981',
          }}
        >
          {value}
        </Text>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: (value) => (
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
            backgroundColor:
              value === 'active'
                ? '#DCFCE7'
                : value === 'inactive'
                  ? '#FEE2E2'
                  : '#FEF3C7',
            alignSelf: 'flex-start',
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              color:
                value === 'active'
                  ? '#166534'
                  : value === 'inactive'
                    ? '#991B1B'
                    : '#92400E',
            }}
          >
            {value}
          </Text>
        </View>
      ),
    },
    {
      id: 'score',
      header: 'Score',
      accessorKey: 'score',
      sortable: true,
      align: 'right',
      cell: (value) => <Text style={{ fontWeight: '600' }}>{value}</Text>,
    },
  ];

  const handleRowPress = (user: User) => {
    // console.log('User clicked:', user);
    // Navigate to user detail or show modal
  };

  return (
    <Table
      data={sampleUsers}
      columns={userColumns}
      onRowPress={handleRowPress}
      searchPlaceholder='Search users...'
      emptyMessage='No users found'
    />
  );
}

// Example 2: Product Table with Custom Pagination
export function ProductTable() {
  const productColumns: TableColumn<Product>[] = [
    {
      id: 'id',
      header: 'ID',
      accessorKey: 'id',
      sortable: true,
      width: 80,
      cell: (value) => (
        <Text style={{ fontWeight: '500', fontFamily: 'monospace' }}>
          {value}
        </Text>
      ),
    },
    {
      id: 'name',
      header: 'Product Name',
      accessorKey: 'name',
      sortable: true,
      filterable: true,
      minWidth: 200,
    },
    {
      id: 'category',
      header: 'Category',
      accessorKey: 'category',
      sortable: true,
      filterable: true,
    },
    {
      id: 'price',
      header: 'Price',
      accessorKey: 'price',
      sortable: true,
      align: 'right',
      cell: (value) => (
        <Text style={{ fontWeight: '600' }}>${value.toFixed(2)}</Text>
      ),
    },
    {
      id: 'stock',
      header: 'Stock',
      accessorKey: 'stock',
      sortable: true,
      align: 'center',
      cell: (value) => (
        <Text
          style={{
            color: value > 20 ? '#10B981' : value > 5 ? '#F59E0B' : '#EF4444',
            fontWeight: '500',
          }}
        >
          {value}
        </Text>
      ),
    },
    {
      id: 'rating',
      header: 'Rating',
      accessorKey: 'rating',
      sortable: true,
      align: 'center',
      cell: (value) => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginRight: 4 }}>⭐</Text>
          <Text>{value.toFixed(1)}</Text>
        </View>
      ),
    },
    {
      id: 'featured',
      header: 'Featured',
      accessorKey: 'featured',
      sortable: true,
      align: 'center',
      cell: (value) => <Text>{value ? '✅' : '❌'}</Text>,
    },
  ];

  return (
    <Table
      data={sampleProducts}
      columns={productColumns}
      pageSize={5}
      searchPlaceholder='Search products...'
      emptyMessage='No products found'
    />
  );
}

// Example 3: Minimal Table (No Search, No Pagination)
export function MinimalTable() {
  const columns: TableColumn[] = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      sortable: true,
    },
    {
      id: 'value',
      header: 'Value',
      accessorKey: 'value',
      sortable: true,
      align: 'right',
    },
  ];

  const data = [
    { name: 'Item 1', value: 100 },
    { name: 'Item 2', value: 200 },
    { name: 'Item 3', value: 150 },
  ];

  return (
    <Table
      data={data}
      columns={columns}
      pagination={false}
      searchable={false}
      sortable={true}
    />
  );
}

// Example 4: Loading State
export function LoadingTableExample() {
  const columns: TableColumn[] = [
    { id: 'name', header: 'Name', accessorKey: 'name' },
    { id: 'email', header: 'Email', accessorKey: 'email' },
  ];

  return <Table data={[]} columns={columns} loading={true} />;
}

// Example 5: Custom Styled Table
export function CustomStyledTable() {
  const columns: TableColumn<User>[] = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      sortable: true,
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
      sortable: true,
    },
  ];

  return (
    <Table
      data={sampleUsers}
      columns={columns}
      style={{
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}
      headerStyle={{
        backgroundColor: '#FF0000',
      }}
      rowStyle={{
        paddingVertical: 4,
      }}
      cellStyle={{
        paddingVertical: 20,
      }}
    />
  );
}

// Complete demo component
export function TableDemo() {
  return (
    <View style={{ padding: 16, gap: 32 }}>
      <View>
        <Text variant='heading' style={{ marginBottom: 16 }}>
          User Management Table
        </Text>
        <BasicUserTable />
      </View>

      <View>
        <Text variant='heading' style={{ marginBottom: 16 }}>
          Product Catalog
        </Text>
        <ProductTable />
      </View>

      <View>
        <Text variant='heading' style={{ marginBottom: 16 }}>
          Minimal Table
        </Text>
        <MinimalTable />
      </View>
    </View>
  );
}

/* 
DATA TABLE COMPONENT DOCUMENTATION

## Features
- ✅ Sorting (ascending, descending, none)
- ✅ Search/filtering across all filterable columns
- ✅ Pagination with customizable page size
- ✅ Custom cell renderers
- ✅ Responsive horizontal scrolling
- ✅ Loading states
- ✅ Empty states
- ✅ Row click handlers
- ✅ Customizable styling
- ✅ TypeScript support
- ✅ Theme integration

## Props

### TableProps<T>
- `data: T[]` - Array of data objects
- `columns: TableColumn<T>[]` - Column definitions
- `pagination?: boolean` - Enable pagination (default: true)
- `pageSize?: number` - Items per page (default: 10)
- `searchable?: boolean` - Enable search bar (default: true)
- `searchPlaceholder?: string` - Search input placeholder
- `loading?: boolean` - Show loading state
- `emptyMessage?: string` - Message when no data
- `onRowPress?: (row: T, index: number) => void` - Row click handler
- `sortable?: boolean` - Enable sorting (default: true)
- `filterable?: boolean` - Enable filtering (default: true)
- `style?: ViewStyle` - Container styles
- `headerStyle?: ViewStyle` - Header row styles
- `rowStyle?: ViewStyle` - Data row styles
- `cellStyle?: ViewStyle` - Individual cell styles

### TableColumn<T>
- `id: string` - Unique column identifier
- `header: string` - Column header text
- `accessorKey: string` - Property key in data object
- `sortable?: boolean` - Enable sorting for this column
- `filterable?: boolean` - Include in search filter
- `width?: number | string` - Fixed column width
- `minWidth?: number` - Minimum column width
- `align?: 'left' | 'center' | 'right'` - Text alignment
- `cell?: (value: any, row: T) => React.ReactNode` - Custom cell renderer
- `headerCell?: () => React.ReactNode` - Custom header renderer

## Usage demo

### Basic Usage
```tsx
const columns = [
  { id: 'name', header: 'Name', accessorKey: 'name', sortable: true },
  { id: 'email', header: 'Email', accessorKey: 'email', sortable: true },
];

<Table data={users} columns={columns} />
```

### Custom Cell Rendering
```tsx
const columns = [
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: (value) => (
      <Badge variant={value === 'active' ? 'success' : 'secondary'}>
        {value}
      </Badge>
    ),
  },
];
```

### Disable Features
```tsx
<Table
  data={data}
  columns={columns}
  pagination={false}
  searchable={false}
  sortable={false}
/>
```

## Best Practices

1. **Performance**: For large datasets (>1000 rows), consider implementing server-side pagination
2. **Accessibility**: Ensure custom cell renderers are accessible
3. **Responsive**: Use minWidth for columns that need guaranteed space
4. **Loading States**: Always provide loading states for async data
5. **Error Handling**: Implement proper error boundaries around the table
6. **Testing**: Test with empty data, single row, and large datasets

## Customization

The component fully integrates with your theme system and can be customized through:
- Theme colors (automatically applied)
- Custom styles for container, headers, rows, and cells
- Custom cell and header renderers
- Configurable pagination and search behavior

*/
