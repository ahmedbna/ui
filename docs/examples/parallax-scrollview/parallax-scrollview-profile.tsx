import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ParallaxScrollView } from '@/components/ui/parallax-scrollview';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

export function ParallaxScrollViewProfile() {
  return (
    <ParallaxScrollView
      headerHeight={320}
      headerImage={
        <View style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            style={{ width: '100%', height: '100%' }}
            contentFit='cover'
          />
          <LinearGradient
            colors={['transparent', 'black']}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '80%',
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 20,
              left: 0,
              right: 0,
              alignItems: 'center',
              gap: 12,
            }}
          >
            <Avatar size={90}>
              <AvatarImage
                source={{
                  uri: 'https://avatars.githubusercontent.com/u/99088394?v=4',
                }}
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 24,
                  fontWeight: 'bold',
                  textShadowColor: 'rgba(0,0,0,0.5)',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }}
              >
                John Doe
              </Text>
              <Text
                style={{
                  color: '#e0e0e0',
                  fontSize: 16,
                  textShadowColor: 'rgba(0,0,0,0.5)',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }}
              >
                Software Engineer
              </Text>
            </View>
          </View>
        </View>
      }
    >
      <View style={{ gap: 20 }}>
        <View style={{ gap: 8 }}>
          <Text variant='title'>About</Text>
          <Text>
            Passionate software engineer with 5+ years of experience in mobile
            and web development. Specialized in React Native, TypeScript, and
            modern UI frameworks.
          </Text>
        </View>

        <View style={{ gap: 8 }}>
          <Text variant='title'>Skills</Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 8,
            }}
          >
            {[
              'React Native',
              'TypeScript',
              'Node.js',
              'GraphQL',
              'MongoDB',
            ].map((skill) => (
              <Badge variant='success' key={skill}>
                {skill}
              </Badge>
            ))}
          </View>
        </View>

        <View style={{ gap: 8 }}>
          <Text variant='title'>Experience</Text>
          <View style={{ gap: 12 }}>
            <View>
              <Text variant='subtitle'>Senior Mobile Developer</Text>
              <Text variant='caption'>Tech Corp • 2022 - Present</Text>
              <Text style={{ marginTop: 4 }}>
                Leading mobile development team and architecting scalable React
                Native applications.
              </Text>
            </View>
            <View>
              <Text variant='subtitle'>Frontend Developer</Text>
              <Text variant='caption'>StartupXYZ • 2020 - 2022</Text>
              <Text style={{ marginTop: 4 }}>
                Built responsive web applications using React and modern
                frontend technologies.
              </Text>
            </View>
          </View>
        </View>

        <View style={{ gap: 8 }}>
          <Text variant='title'>Contact</Text>
          <Text>📧 john.doe@example.com</Text>
          <Text>🌐 johndoe.dev</Text>
          <Text>📱 LinkedIn: @johndoe</Text>
        </View>
      </View>
    </ParallaxScrollView>
  );
}
