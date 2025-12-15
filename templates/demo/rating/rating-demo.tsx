import { Rating } from '@/components/ui/rating';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';
import { Text } from '@/components/ui/text';

export function RatingDemo() {
  const [rating, setRating] = useState(3);

  return (
    <View style={{ gap: 20, alignItems: 'center' }}>
      <Rating rating={rating} onRatingChange={setRating} />
      <Text>Current Rating: {rating}</Text>
    </View>
  );
}
