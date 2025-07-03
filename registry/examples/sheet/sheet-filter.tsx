import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Filter } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export function SheetFilter() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    price: 'all',
    rating: 'all',
    brand: 'all',
  });

  const textColor = useThemeColor({}, 'text');
  const mutedColor = useThemeColor({}, 'textMuted');
  const borderColor = useThemeColor({}, 'border');

  const filterOptions = {
    category: [
      { value: 'all', label: 'All Categories' },
      { value: 'electronics', label: 'Electronics' },
      { value: 'clothing', label: 'Clothing' },
      { value: 'books', label: 'Books' },
      { value: 'home', label: 'Home & Garden' },
    ],
    price: [
      { value: 'all', label: 'Any Price' },
      { value: 'under-25', label: 'Under $25' },
      { value: '25-50', label: '$25 - $50' },
      { value: '50-100', label: '$50 - $100' },
      { value: 'over-100', label: 'Over $100' },
    ],
    rating: [
      { value: 'all', label: 'Any Rating' },
      { value: '4-plus', label: '4+ Stars' },
      { value: '3-plus', label: '3+ Stars' },
      { value: '2-plus', label: '2+ Stars' },
    ],
    brand: [
      { value: 'all', label: 'All Brands' },
      { value: 'apple', label: 'Apple' },
      { value: 'samsung', label: 'Samsung' },
      { value: 'nike', label: 'Nike' },
      { value: 'adidas', label: 'Adidas' },
    ],
  };

  const handleFilterChange = (
    filterType: keyof typeof filters,
    value: string
  ) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const handleApplyFilters = () => {
    // Apply filters logic here
    console.log('Applied filters:', filters);
    setOpen(false);
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      price: 'all',
      rating: 'all',
      brand: 'all',
    });
  };

  const renderFilterSection = (
    title: string,
    filterType: keyof typeof filters,
    options: { value: string; label: string }[]
  ) => (
    <View style={styles.filterSection}>
      <Text style={[styles.sectionTitle, { color: textColor }]}>{title}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              {
                borderColor,
                backgroundColor:
                  filters[filterType] === option.value
                    ? `${textColor}10`
                    : 'transparent',
              },
            ]}
            onPress={() => handleFilterChange(filterType, option.value)}
          >
            <Text
              style={[
                styles.optionText,
                {
                  color:
                    filters[filterType] === option.value
                      ? textColor
                      : mutedColor,
                },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button icon={Filter}>Filter</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Products</SheetTitle>
          <SheetDescription>
            Refine your search results using the filters below.
          </SheetDescription>
        </SheetHeader>
        <View style={styles.filterContainer}>
          {renderFilterSection('Category', 'category', filterOptions.category)}
          {renderFilterSection('Price Range', 'price', filterOptions.price)}
          {renderFilterSection('Rating', 'rating', filterOptions.rating)}
          {renderFilterSection('Brand', 'brand', filterOptions.brand)}

          <View style={styles.buttonContainer}>
            <Button style={styles.button} onPress={handleApplyFilters}>
              Apply Filters
            </Button>
            <Button
              variant='outline'
              style={styles.button}
              onPress={handleClearFilters}
            >
              Clear All
            </Button>
          </View>
        </View>
      </SheetContent>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    padding: 16,
    gap: 24,
  },
  filterSection: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  optionsContainer: {
    gap: 8,
  },
  option: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  button: {
    flex: 1,
  },
});
