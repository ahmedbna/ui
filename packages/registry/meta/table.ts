// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const tableMeta: ComponentMeta = {
  name: 'table',
  usage: {
    import: "import { Table, TableColumn } from '@/components/ui/table';",
    snippet:
      "const data = [\n  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },\n  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },\n];\n\nconst columns: TableColumn[] = [\n  { id: 'name', header: 'Name', accessorKey: 'name', sortable: true },\n  { id: 'email', header: 'Email', accessorKey: 'email', sortable: true },\n  { id: 'role', header: 'Role', accessorKey: 'role', filterable: true },\n];\n\n<Table data={data} columns={columns} />;",
  },
  types: [
    {
      name: 'Table',
      description:
        'The main table component that renders data in a structured format.',
      props: [
        {
          name: 'data',
          type: 'T[]',
          description: 'Array of data objects to display in the table.',
        },
        {
          name: 'columns',
          type: 'TableColumn<T>[]',
          description: 'Array of column definitions.',
        },
        {
          name: 'pagination',
          type: 'boolean',
          default: '`true`',
          description: 'Whether to enable pagination.',
        },
        {
          name: 'pageSize',
          type: 'number',
          default: '`10`',
          description: 'Number of rows per page.',
        },
        {
          name: 'searchable',
          type: 'boolean',
          default: '`true`',
          description: 'Whether to show the search bar.',
        },
        {
          name: 'searchPlaceholder',
          type: 'string',
          default: "`'Search...'`",
          description: 'Placeholder text for the search input.',
        },
        {
          name: 'loading',
          type: 'boolean',
          default: '`false`',
          description: 'Whether to show loading state.',
        },
        {
          name: 'emptyMessage',
          type: 'string',
          default: "`'No data available'`",
          description: 'Message to show when no data is available.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles for the table container.',
        },
        {
          name: 'headerStyle',
          type: 'ViewStyle',
          description: 'Additional styles for the header row.',
        },
        {
          name: 'rowStyle',
          type: 'ViewStyle',
          description: 'Additional styles for data rows.',
        },
        {
          name: 'cellStyle',
          type: 'ViewStyle',
          description: 'Additional styles for table cells.',
        },
        {
          name: 'onRowPress',
          type: '(row: T, index: number) => void',
          description: 'Callback when a row is pressed.',
        },
        {
          name: 'sortable',
          type: 'boolean',
          default: '`true`',
          description: 'Whether to enable global sorting functionality.',
        },
        {
          name: 'filterable',
          type: 'boolean',
          default: '`true`',
          description: 'Whether to enable global filtering functionality.',
        },
      ],
    },
    {
      name: 'TableColumn',
      description: 'Configuration object for table columns.',
      props: [
        {
          name: 'id',
          type: 'string',
          description: 'Unique identifier for the column.',
        },
        {
          name: 'header',
          type: 'string',
          description: 'Text to display in the column header.',
        },
        {
          name: 'accessorKey',
          type: 'string',
          description: 'Key to access data from the row object.',
        },
        {
          name: 'sortable',
          type: 'boolean',
          default: '`false`',
          description: 'Whether this column can be sorted.',
        },
        {
          name: 'filterable',
          type: 'boolean',
          default: '`false`',
          description: 'Whether this column is included in search filters.',
        },
        {
          name: 'width',
          type: 'number | string',
          description: 'Fixed width for the column.',
        },
        {
          name: 'minWidth',
          type: 'number',
          default: '`100`',
          description: 'Minimum width for the column.',
        },
        {
          name: 'cell',
          type: '(value: any, row: T) => React.ReactNode',
          description: 'Custom cell renderer function.',
        },
        {
          name: 'headerCell',
          type: '() => React.ReactNode',
          description: 'Custom header cell renderer function.',
        },
        {
          name: 'align',
          type: "'left' | 'center' | 'right'",
          default: "`'left'`",
          description: 'Text alignment for the column.',
        },
      ],
    },
  ],
};
