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
import React, { useState } from 'react';

export function SheetDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Welcome to the Sheet</SheetTitle>
          <SheetDescription>
            This is a basic sheet component that slides in from the right side
            of the screen.
          </SheetDescription>
        </SheetHeader>
        <View style={{ padding: 24, gap: 16 }}>
          <Text>
            This sheet can contain any content you need. It's perfect for
            navigation menus, forms, settings, or detailed information.
          </Text>
          <Button onPress={() => setOpen(false)}>Close Sheet</Button>
        </View>
      </SheetContent>
    </Sheet>
  );
}
