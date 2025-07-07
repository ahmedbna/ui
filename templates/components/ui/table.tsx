import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS, FONT_SIZE, HEIGHT } from '@/theme/globals';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronUp,
  Search,
} from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  TextInput,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

// Types
export interface TableColumn<T = any> {
  id: string;
  header: string;
  accessorKey: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: number | string;
  minWidth?: number;
  cell?: (value: any, row: T) => React.ReactNode;
  headerCell?: () => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  pagination?: boolean;
  pageSize?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
  loading?: boolean;
  emptyMessage?: string;
  style?: ViewStyle;
  headerStyle?: ViewStyle;
  rowStyle?: ViewStyle;
  cellStyle?: ViewStyle;
  onRowPress?: (row: T, index: number) => void;
  sortable?: boolean;
  filterable?: boolean;
}

type SortDirection = 'asc' | 'desc' | null;

interface SortState {
  column: string | null;
  direction: SortDirection;
}

export function Table<T = any>({
  data,
  columns,
  pagination = true,
  pageSize = 10,
  searchable = true,
  searchPlaceholder = 'Search...',
  loading = false,
  emptyMessage = 'No data available',
  style,
  headerStyle,
  rowStyle,
  cellStyle,
  onRowPress,
  sortable = true,
  filterable = true,
}: TableProps<T>) {
  // Theme colors
  const borderColor = useThemeColor({}, 'border');
  const textColor = useThemeColor({}, 'text');
  const mutedColor = useThemeColor({}, 'textMuted');
  const cardColor = useThemeColor({}, 'card');
  const primaryColor = useThemeColor({}, 'primary');

  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: null,
  });

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let processedData = [...data];

    // Apply search filter
    if (searchQuery && filterable) {
      processedData = processedData.filter((row) =>
        columns.some((column) => {
          if (!column.filterable) return false;
          const value = (row as any)[column.accessorKey];
          return String(value || '')
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        })
      );
    }

    // Apply sorting
    if (sortState.column && sortState.direction && sortable) {
      processedData.sort((a, b) => {
        const aValue = (a as any)[sortState.column!];
        const bValue = (b as any)[sortState.column!];

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          const comparison = aValue.localeCompare(bValue);
          return sortState.direction === 'asc' ? comparison : -comparison;
        }

        if (aValue < bValue) return sortState.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortState.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return processedData;
  }, [data, searchQuery, sortState, columns, filterable, sortable]);

  // Pagination
  const totalPages = pagination
    ? Math.ceil(filteredAndSortedData.length / pageSize)
    : 1;
  const startIndex = pagination ? (currentPage - 1) * pageSize : 0;
  const endIndex = pagination
    ? startIndex + pageSize
    : filteredAndSortedData.length;
  const paginatedData = filteredAndSortedData.slice(startIndex, endIndex);

  // Handlers
  const handleSort = (columnId: string) => {
    if (!sortable) return;

    const column = columns.find((col) => col.id === columnId);
    if (!column?.sortable) return;

    setSortState((prev) => {
      if (prev.column === columnId) {
        // Cycle through: asc -> desc -> null
        const newDirection: SortDirection =
          prev.direction === 'asc'
            ? 'desc'
            : prev.direction === 'desc'
            ? null
            : 'asc';

        return {
          column: newDirection ? columnId : null,
          direction: newDirection,
        };
      } else {
        return { column: columnId, direction: 'asc' };
      }
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const renderSortIcon = (columnId: string) => {
    if (!sortable) return null;

    const column = columns.find((col) => col.id === columnId);
    if (!column?.sortable) return null;

    if (sortState.column !== columnId) {
      return (
        <ChevronUp size={16} color={mutedColor} style={{ opacity: 0.3 }} />
      );
    }

    return sortState.direction === 'asc' ? (
      <ChevronUp size={16} color={primaryColor} />
    ) : (
      <ChevronDown size={16} color={primaryColor} />
    );
  };

  const renderCell = (column: TableColumn<T>, row: T, rowIndex: number) => {
    const value = (row as any)[column.accessorKey];
    const cellContent = column.cell
      ? column.cell(value, row)
      : String(value || '');

    const alignStyle: TextStyle = {
      textAlign: column.align || 'left',
    };

    return (
      <View
        key={column.id}
        style={[
          {
            flex: column.width ? 0 : 1,
            width: column.width as any,
            minWidth: column.minWidth || 100,
            paddingHorizontal: 18,
            paddingVertical: 16,
            justifyContent: 'center',
          },
          cellStyle,
        ]}
      >
        {typeof cellContent === 'string' ? (
          <Text style={[{ fontSize: FONT_SIZE }, alignStyle]}>
            {cellContent}
          </Text>
        ) : (
          cellContent
        )}
      </View>
    );
  };

  const renderHeader = () => (
    <View
      style={[
        {
          flexDirection: 'row',
          backgroundColor: cardColor,
          borderBottomWidth: 1,
          borderBottomColor: borderColor,
        },
        headerStyle,
      ]}
    >
      {columns.map((column) => (
        <TouchableOpacity
          key={column.id}
          style={{
            flex: column.width ? 0 : 1,
            width: column.width as any,
            minWidth: column.minWidth || 100,
            paddingHorizontal: 18,
            paddingVertical: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:
              column.align === 'center'
                ? 'center'
                : column.align === 'right'
                ? 'flex-end'
                : 'flex-start',
          }}
          onPress={() => handleSort(column.id)}
          disabled={!column.sortable || !sortable}
        >
          {column.headerCell ? (
            column.headerCell()
          ) : (
            <>
              <Text
                variant='subtitle'
                style={{
                  marginRight: column.sortable && sortable ? 4 : 0,
                  textAlign: column.align || 'left',
                }}
              >
                {column.header}
              </Text>
              {renderSortIcon(column.id)}
            </>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderRow = (row: T, index: number) => (
    <TouchableOpacity
      key={index}
      style={[
        {
          flexDirection: 'row',
          backgroundColor: cardColor,
          borderBottomWidth: 1,
          borderBottomColor: borderColor,
        },
        rowStyle,
      ]}
      onPress={() => onRowPress?.(row, index)}
      disabled={!onRowPress}
      activeOpacity={onRowPress ? 0.7 : 1}
    >
      {columns.map((column) => renderCell(column, row, index))}
    </TouchableOpacity>
  );

  const renderPagination = () => {
    if (!pagination || totalPages <= 1) return null;

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 18,
          backgroundColor: cardColor,
          borderTopWidth: 1,
          borderTopColor: borderColor,
        }}
      >
        <Text variant='caption'>
          Page {currentPage} of {totalPages} ({filteredAndSortedData.length}{' '}
          total)
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Button
            variant='outline'
            size='sm'
            onPress={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft
              size={16}
              color={currentPage === 1 ? mutedColor : textColor}
            />
          </Button>

          <Button
            variant='outline'
            size='sm'
            onPress={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft
              size={16}
              color={currentPage === 1 ? mutedColor : textColor}
            />
          </Button>

          <Button
            variant='outline'
            size='sm'
            onPress={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight
              size={16}
              color={currentPage === totalPages ? mutedColor : textColor}
            />
          </Button>

          <Button
            variant='outline'
            size='sm'
            onPress={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight
              size={16}
              color={currentPage === totalPages ? mutedColor : textColor}
            />
          </Button>
        </View>
      </View>
    );
  };

  const renderSearchBar = () => {
    if (!searchable || !filterable) return null;

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: cardColor,
          borderBottomWidth: 1,
          borderColor: borderColor,
          paddingHorizontal: 18,
          height: HEIGHT,
          marginVertical: 2,
        }}
      >
        <Search size={16} color={mutedColor} style={{ marginRight: 8 }} />

        <TextInput
          style={{
            flex: 1,
            fontSize: FONT_SIZE,
            color: textColor,
            paddingVertical: 8,
          }}
          placeholder={searchPlaceholder}
          placeholderTextColor={mutedColor}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    );
  };

  const renderEmptyState = () => (
    <View
      style={{
        padding: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: cardColor,
      }}
    >
      <Text variant='body' style={{ color: mutedColor }}>
        {emptyMessage}
      </Text>
    </View>
  );

  const renderLoadingState = () => (
    <View
      style={{
        padding: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: cardColor,
      }}
    >
      <Text variant='body' style={{ color: mutedColor }}>
        Loading...
      </Text>
    </View>
  );

  return (
    <View
      style={[
        {
          width: '100%',
          borderRadius: BORDER_RADIUS,
          borderWidth: 1,
          borderColor: borderColor,
          backgroundColor: cardColor,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {renderSearchBar()}

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ minWidth: '100%' }}>
          {renderHeader()}

          {loading ? (
            renderLoadingState()
          ) : paginatedData.length === 0 ? (
            renderEmptyState()
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {paginatedData.map((row, index) => renderRow(row, index))}
            </ScrollView>
          )}
        </View>
      </ScrollView>

      {renderPagination()}
    </View>
  );
}
