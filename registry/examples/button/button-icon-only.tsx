import { Button } from '@/components/ui/button';
import { View } from '@/components/ui/view';
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Settings,
  Share,
} from 'lucide-react-native';
import React from 'react';

export function ButtonIconOnly() {
  return (
    <View style={{ gap: 12, flexDirection: 'row', flexWrap: 'wrap' }}>
      <Button size='icon' icon={Settings} />

      <Button size='icon' variant='outline' icon={Heart} />

      <Button size='icon' variant='secondary' icon={Share} />

      <Button size='icon' variant='ghost' icon={MoreHorizontal} />

      <Button size='icon' variant='destructive' icon={MessageCircle} />
    </View>
  );
}
