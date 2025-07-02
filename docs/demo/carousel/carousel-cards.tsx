import { Carousel, CarouselItem } from '@/components/ui/carousel';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Calendar, MapPin, User } from 'lucide-react-native';
import React from 'react';

export function CarouselCards() {
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');

  const events = [
    {
      title: 'Tech Summit',
      location: 'New York, NY',
      date: 'Apr 8-10, 2024',
      attendees: 2100,
      category: 'Technology',
      color: '#10b981',
    },
    {
      title: 'Creative Workshop',
      location: 'Los Angeles, CA',
      date: 'May 22-23, 2024',
      attendees: 850,
      category: 'Creative',
      color: '#f59e0b',
    },
    {
      title: 'Design Conference 2024',
      location: 'San Francisco, CA',
      date: 'Mar 15-17, 2024',
      attendees: 1250,
      category: 'Design',
      color: '#3b82f6',
    },
  ];

  return (
    <Carousel showIndicators>
      {events.map((event, index) => (
        <CarouselItem key={index}>
          <View style={{ padding: 20 }}>
            {/* Category Badge */}
            <View
              style={{
                alignSelf: 'flex-start',
                backgroundColor: event.color,
                paddingHorizontal: 12,
                paddingVertical: 4,
                borderRadius: 12,
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  fontWeight: '600',
                }}
              >
                {event.category}
              </Text>
            </View>

            {/* Event Title */}
            <Text
              variant='title'
              style={{
                color: textColor,
                fontSize: 20,
                marginBottom: 16,
                lineHeight: 28,
              }}
            >
              {event.title}
            </Text>

            {/* Event Details */}
            <View style={{ gap: 12 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <MapPin size={16} color={primaryColor} />
                <Text style={{ color: textColor, flex: 1 }}>
                  {event.location}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Calendar size={16} color={primaryColor} />
                <Text style={{ color: textColor, flex: 1 }}>{event.date}</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <User size={16} color={primaryColor} />
                <Text style={{ color: textColor, flex: 1 }}>
                  {event.attendees.toLocaleString()} attendees
                </Text>
              </View>
            </View>

            {/* Action Button */}
            <View
              style={{
                backgroundColor: event.color,
                borderRadius: 8,
                paddingVertical: 12,
                paddingHorizontal: 16,
                marginTop: 20,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  fontSize: 16,
                }}
              >
                Learn More
              </Text>
            </View>
          </View>
        </CarouselItem>
      ))}
    </Carousel>
  );
}
