import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { FONT_SIZE } from '@/theme/globals';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function SheetExample() {
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setSheetOpen(open);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sheet Debug Test</Text>

      {/* Manual button to test state */}
      <Button
        onPress={() => {
          setSheetOpen(!sheetOpen);
        }}
      >
        {`Manual Toggle (Current: ${sheetOpen ? 'Open' : 'Closed'})`}
      </Button>

      {/* Sheet component */}
      <Sheet open={sheetOpen} onOpenChange={handleOpenChange} side='left'>
        <View style={{ marginVertical: 10 }}>
          <SheetTrigger>Open Sheet via Trigger</SheetTrigger>
        </View>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Debug Sheet</SheetTitle>
          </SheetHeader>

          <View style={styles.sheetContent}>
            <Text style={styles.contentText}>
              If you can see this, the sheet is working!
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSheetOpen(false)}
            >
              <Text style={styles.buttonText}>Close Sheet</Text>
            </TouchableOpacity>
          </View>
        </SheetContent>
      </Sheet>

      <Text style={styles.debugInfo}>
        Current sheet state: {sheetOpen ? 'OPEN' : 'CLOSED'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  debugButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  triggerButton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    minWidth: 150,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sheetContent: {
    padding: 20,
    alignItems: 'center',
  },
  contentText: {
    fontSize: FONT_SIZE,
    textAlign: 'center',
    marginBottom: 20,
  },
  debugInfo: {
    marginTop: 20,
    fontSize: FONT_SIZE,
    fontWeight: 'bold',
    color: '#666',
  },
});
