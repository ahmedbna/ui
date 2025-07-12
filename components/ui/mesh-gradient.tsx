import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export interface MeshGradientProps {
  colors: string[];
  density?: number;
  seed?: number;
  style?: ViewStyle;
  blur?: number;
  children?: React.ReactNode;
}

// Generate random positions for color circles
const generateColorCircles = (
  colors: string[],
  density: number,
  seed: number = Math.random() * 1000
) => {
  const circles = [];

  for (let i = 0; i < density; i++) {
    const seedX = seed + i * 2;
    const seedY = seed + i * 2 + 1;
    const seedColor = seed + i * 3;
    const seedSize = seed + i * 4;

    // Seeded random function
    const random = (s: number) => {
      let x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };

    circles.push({
      x: random(seedX) * 100, // 0-100%
      y: random(seedY) * 100,
      color: colors[Math.floor(random(seedColor) * colors.length)],
      size: 30 + random(seedSize) * 40, // 30-70% size
      opacity: 0.6 + random(seed + i * 5) * 0.4, // 0.6-1.0 opacity
    });
  }

  return circles;
};

export const MeshGradient: React.FC<MeshGradientProps> = ({
  colors,
  density = 8,
  seed,
  style,
  blur = 0.8,
  children,
}) => {
  const circles = useMemo(() => {
    return generateColorCircles(colors, density, seed);
  }, [colors, density, seed]);

  return (
    <View style={[styles.container, style]}>
      {/* Background */}
      <View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: colors[0] + '20' },
        ]}
      />

      {/* Color circles */}
      {circles.map((circle, index) => (
        <View
          key={index}
          style={[
            styles.circleContainer,
            {
              left: `${circle.x}%`,
              top: `${circle.y}%`,
              width: `${circle.size}%`,
              height: `${circle.size}%`,
              opacity: circle.opacity,
            },
          ]}
        >
          <LinearGradient
            colors={[circle.color, circle.color + '00']}
            start={[0.5, 0.5]}
            end={[1, 1]}
            style={[
              styles.circle,
              {
                shadowColor: circle.color,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: blur,
                shadowRadius: 20,
              },
            ]}
          />
        </View>
      ))}

      {/* Blur overlay for better blending */}
      <View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: 'transparent' },
        ]}
      >
        {circles.map((circle, index) => (
          <View
            key={`blur-${index}`}
            style={[
              styles.blurCircle,
              {
                left: `${circle.x}%`,
                top: `${circle.y}%`,
                width: `${circle.size * 1.5}%`,
                height: `${circle.size * 1.5}%`,
                backgroundColor: circle.color + '30',
                shadowColor: circle.color,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: blur * 0.5,
                shadowRadius: 30,
              },
            ]}
          />
        ))}
      </View>

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  circleContainer: {
    position: 'absolute',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  circle: {
    flex: 1,
    borderRadius: 1000,
  },
  blurCircle: {
    position: 'absolute',
    borderRadius: 1000,
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
});
