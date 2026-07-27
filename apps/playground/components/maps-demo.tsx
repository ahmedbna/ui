import { Button } from '@/components/ui/button';
import {
  MapCircle,
  MapMarker,
  MapPolygon,
  MapPolyline,
  Maps,
  MapType,
} from '@/components/ui/maps'; // Adjust import path as needed
import { Text } from '@/components/ui/text';
import { useColor } from '@/hooks/useColor';
import { BORDER_RADIUS } from '@/theme/globals';
import { Building, Coffee, MapPin, Plane, Star } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface DemoScenario {
  id: string;
  title: string;
  description: string;
  config: any;
}

export function MapsDemo() {
  const [currentScenario, setCurrentScenario] = useState<string>('basic');

  // Theme colors
  const backgroundColor = useColor('background');
  const cardColor = useColor('card');
  const primaryColor = useColor('primary');
  const secondary = useColor('secondary');
  const textColor = useColor('text');
  const mutedColor = useColor('textMuted');
  const borderColor = useColor('border');

  // Demo data
  const cairoRegion = {
    latitude: 30.0444,
    longitude: 31.2357,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const gizaRegion = {
    latitude: 29.9792,
    longitude: 31.1342,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const alexandriaRegion = {
    latitude: 31.2001,
    longitude: 29.9187,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  // Sample markers for different scenarios
  const touristMarkers: MapMarker[] = [
    {
      id: '1',
      coordinate: { latitude: 29.9792, longitude: 31.1342 },
      title: 'Great Pyramid of Giza',
      description: 'One of the Seven Wonders of the Ancient World',
      color: '#FFD700',
      icon: Star,
      onPress: () => Alert.alert('Pyramid Info', 'Built around 2580–2510 BC'),
    },
    {
      id: '2',
      coordinate: { latitude: 29.9753, longitude: 31.1376 },
      title: 'Sphinx',
      description: 'Ancient limestone statue',
      color: '#FF6B35',
      icon: Star,
    },
    {
      id: '3',
      coordinate: { latitude: 30.0444, longitude: 31.2357 },
      title: 'Cairo Citadel',
      description: 'Medieval Islamic fortification',
      color: '#4ECDC4',
      icon: Building,
    },
  ];

  const businessMarkers: MapMarker[] = [
    {
      id: '4',
      coordinate: { latitude: 30.0626, longitude: 31.2497 },
      title: 'Coffee Shop',
      description: 'Best coffee in town',
      color: '#8B4513',
      icon: Coffee,
    },
    {
      id: '5',
      coordinate: { latitude: 30.0444, longitude: 31.2357 },
      title: 'Office Building',
      description: 'Modern business center',
      color: '#1E90FF',
      icon: Building,
    },
    {
      id: '6',
      coordinate: { latitude: 30.0375, longitude: 31.2272 },
      title: 'Airport',
      description: 'Cairo International Airport',
      color: '#FF1493',
      icon: Plane,
    },
  ];

  const routePolyline: MapPolyline[] = [
    {
      id: 'route1',
      coordinates: [
        { latitude: 30.0444, longitude: 31.2357 },
        { latitude: 30.05, longitude: 31.24 },
        { latitude: 30.06, longitude: 31.25 },
        { latitude: 30.0626, longitude: 31.2497 },
      ],
      strokeColor: '#FF0000',
      strokeWidth: 4,
      lineDashPattern: [5, 5],
    },
  ];

  const areaPolygon: MapPolygon[] = [
    {
      id: 'area1',
      coordinates: [
        { latitude: 30.04, longitude: 31.23 },
        { latitude: 30.05, longitude: 31.23 },
        { latitude: 30.05, longitude: 31.24 },
        { latitude: 30.04, longitude: 31.24 },
      ],
      fillColor: 'rgba(0, 255, 0, 0.3)',
      strokeColor: '#00FF00',
      strokeWidth: 2,
    },
  ];

  const radiusCircle: MapCircle[] = [
    {
      id: 'circle1',
      center: { latitude: 30.0444, longitude: 31.2357 },
      radius: 2000,
      fillColor: 'rgba(0, 0, 255, 0.2)',
      strokeColor: '#0000FF',
      strokeWidth: 2,
    },
  ];

  // Demo scenarios
  const scenarios: DemoScenario[] = [
    {
      id: 'basic',
      title: 'Basic Map',
      description: 'Simple map with default settings',
      config: {
        initialRegion: cairoRegion,
        mapType: 'standard' as MapType,
        showUserLocation: false,
        showControls: true,
      },
    },
    {
      id: 'tourist',
      title: 'Tourist Attractions',
      description: 'Map with tourist markers and custom icons',
      config: {
        initialRegion: gizaRegion,
        markers: touristMarkers,
        mapType: 'satellite' as MapType,
        showControls: true,
        showUserLocation: true,
      },
    },
    {
      id: 'business',
      title: 'Business Locations',
      description: 'Business markers with different categories',
      config: {
        initialRegion: cairoRegion,
        markers: businessMarkers,
        mapType: 'hybrid' as MapType,
        showControls: true,
      },
    },
    {
      id: 'routes',
      title: 'Route Planning',
      description: 'Map with polylines showing routes',
      config: {
        initialRegion: cairoRegion,
        markers: businessMarkers.slice(0, 2),
        polylines: routePolyline,
        mapType: 'standard' as MapType,
        showControls: true,
      },
    },
    {
      id: 'areas',
      title: 'Area Mapping',
      description: 'Map with polygons showing areas',
      config: {
        initialRegion: cairoRegion,
        polygons: areaPolygon,
        mapType: 'terrain' as MapType,
        showControls: true,
      },
    },
    {
      id: 'radius',
      title: 'Coverage Areas',
      description: 'Map with circles showing coverage radius',
      config: {
        initialRegion: cairoRegion,
        circles: radiusCircle,
        markers: [touristMarkers[2]], // Cairo Citadel
        mapType: 'standard' as MapType,
        showControls: true,
      },
    },
    {
      id: 'interactive',
      title: 'Interactive Map',
      description: 'Fully interactive with all features',
      config: {
        initialRegion: cairoRegion,
        markers: [...touristMarkers, ...businessMarkers],
        polylines: routePolyline,
        polygons: areaPolygon,
        circles: radiusCircle,
        mapType: 'hybrid' as MapType,
        showControls: true,
        showUserLocation: true,
        followUserLocation: false,
        showCompass: true,
        onMapPress: (event: any) => {
          const { latitude, longitude } = event.nativeEvent.coordinate;
          Alert.alert(
            'Map Pressed',
            `Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
          );
        },
        onMarkerPress: (marker: MapMarker) => {
          Alert.alert('Marker Pressed', `Selected: ${marker.title}`);
        },
      },
    },
    {
      id: 'minimal',
      title: 'Minimal Controls',
      description: 'Map with minimal UI controls',
      config: {
        initialRegion: alexandriaRegion,
        markers: [
          {
            id: 'alex1',
            coordinate: { latitude: 31.2001, longitude: 29.9187 },
            title: 'Alexandria',
            description: 'Pearl of the Mediterranean',
            color: '#20B2AA',
            icon: MapPin,
          },
        ],
        mapType: 'standard' as MapType,
        showControls: false,
        showUserLocation: false,
        scrollEnabled: true,
        zoomEnabled: true,
        rotateEnabled: false,
        pitchEnabled: false,
      },
    },
    {
      id: 'loading',
      title: 'Loading State',
      description: 'Map in loading state',
      config: {
        loading: true,
        loadingText: 'Loading Egyptian maps...',
      },
    },
  ];

  const currentConfig =
    scenarios.find((s) => s.id === currentScenario)?.config || {};

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Map Container */}
      <View style={styles.mapContainer}>
        <Maps
          {...currentConfig}
          style={styles.map}
          onRegionChangeComplete={(region) => {
            console.log('Region changed:', region);
          }}
        />
      </View>

      {/* Feature List */}
      {currentScenario === 'interactive' && (
        <View
          style={[
            styles.featureList,
            { backgroundColor: cardColor, borderColor },
          ]}
        >
          <Text
            variant='caption'
            style={{ color: mutedColor, marginBottom: 8 }}
          >
            Interactive Features:
          </Text>
          <View style={styles.featureRow}>
            <Text variant='caption' style={{ color: textColor }}>
              • Tap map for coordinates • Tap markers for info
            </Text>
          </View>
          <View style={styles.featureRow}>
            <Text variant='caption' style={{ color: textColor }}>
              • All overlays visible • Full controls enabled
            </Text>
          </View>
        </View>
      )}

      {/* Scenario Selector */}
      <View style={[styles.selectorContainer, { backgroundColor: cardColor }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.selectorContent}
        >
          {scenarios.map((scenario) => (
            <Button
              key={scenario.id}
              variant={currentScenario === scenario.id ? 'default' : 'outline'}
              size='sm'
              onPress={() => setCurrentScenario(scenario.id)}
              style={[
                styles.scenarioButton,
                {
                  backgroundColor:
                    currentScenario === scenario.id
                      ? primaryColor
                      : 'transparent',
                  borderColor: borderColor,
                },
              ]}
            >
              <Text
                variant='caption'
                style={{
                  color:
                    currentScenario === scenario.id ? secondary : textColor,
                  fontWeight: currentScenario === scenario.id ? '600' : '400',
                }}
              >
                {scenario.title}
              </Text>
            </Button>
          ))}
        </ScrollView>

        {/* Current Scenario Info */}
        <View
          style={[
            {
              backgroundColor: cardColor,
              borderColor,
              paddingHorizontal: 20,
              paddingTop: 12,
              borderRadius: BORDER_RADIUS / 2,
            },
          ]}
        >
          <Text variant='subtitle' style={{ color: textColor }}>
            {scenarios.find((s) => s.id === currentScenario)?.title}
          </Text>
          <Text variant='body' style={{ color: mutedColor, marginTop: 2 }}>
            {scenarios.find((s) => s.id === currentScenario)?.description}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  selectorContainer: {
    marginHorizontal: 20,
    paddingVertical: 20,
    borderRadius: BORDER_RADIUS,
  },
  selectorContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  scenarioButton: {
    minWidth: 80,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS / 2,
    borderWidth: 1,
  },
  mapContainer: {
    flex: 1,
    margin: 16,
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  map: {
    flex: 1,
  },
  featureList: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 12,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureRow: {
    marginBottom: 4,
  },
});
