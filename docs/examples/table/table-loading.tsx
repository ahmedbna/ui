import { Button } from '@/components/ui/button';
import { Table, TableColumn } from '@/components/ui/table';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

interface ApiData {
  id: number;
  name: string;
  value: number;
  category: string;
}

const mockData: ApiData[] = [
  { id: 1, name: 'Item A', value: 100, category: 'Type 1' },
  { id: 2, name: 'Item B', value: 250, category: 'Type 2' },
  { id: 3, name: 'Item C', value: 175, category: 'Type 1' },
  { id: 4, name: 'Item D', value: 320, category: 'Type 3' },
];

const columns: TableColumn<ApiData>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
    sortable: true,
    filterable: true,
  },
  {
    id: 'value',
    header: 'Value',
    accessorKey: 'value',
    sortable: true,
    align: 'right',
  },
  {
    id: 'category',
    header: 'Category',
    accessorKey: 'category',
    sortable: true,
    filterable: true,
  },
];

export function TableLoading() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApiData[]>([]);

  const simulateLoading = () => {
    setLoading(true);
    setData([]);

    // Simulate API call
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 2000);
  };

  const clearData = () => {
    setData([]);
    setLoading(false);
  };

  return (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Button onPress={simulateLoading} disabled={loading}>
          Load Data
        </Button>
        <Button variant='outline' onPress={clearData} disabled={loading}>
          Clear Data
        </Button>
      </View>

      <Table
        data={data}
        columns={columns}
        loading={loading}
        emptyMessage="Click 'Load Data' to fetch some data"
        pageSize={5}
      />
    </View>
  );
}
