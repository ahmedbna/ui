import { AudioPlayer } from '@/components/ui/audio-player';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import {
  Heart,
  MoreHorizontal,
  Shuffle,
  SkipBack,
  SkipForward,
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';

export function AudioPlayerMusic() {
  const [isLiked, setIsLiked] = useState(false);
  const sampleAudioUrl =
    'https://www.thesoundarchive.com/ringtones/old-phone-ringing.wav';

  return (
    <View style={styles.musicPlayer}>
      {/* Album Art */}
      <View style={styles.albumArtContainer}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=center',
          }}
          style={styles.albumArt}
        />
      </View>

      {/* Track Information */}
      <View style={styles.trackInfo}>
        <Text variant='body' style={styles.trackTitle}>
          Midnight Waves
        </Text>
        <Text variant='caption' style={styles.artistName}>
          Ocean Sounds Orchestra
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button
          variant='ghost'
          size='icon'
          onPress={() => setIsLiked(!isLiked)}
          style={styles.actionButton}
        >
          <Heart
            size={20}
            color={isLiked ? '#ff6b6b' : '#666'}
            fill={isLiked ? '#ff6b6b' : 'transparent'}
          />
        </Button>
        <Button variant='ghost' size='icon' style={styles.actionButton}>
          <MoreHorizontal size={20} color='#666' />
        </Button>
      </View>

      {/* Audio Player */}
      <AudioPlayer
        source={{ uri: sampleAudioUrl }}
        showControls={true}
        showWaveform={true}
        showTimer={true}
        showProgressBar={false}
        autoPlay={false}
        style={styles.playerContainer}
      />

      {/* Additional Controls */}
      <View style={styles.additionalControls}>
        <Button variant='ghost' size='icon' style={styles.controlButton}>
          <Shuffle size={18} color='#666' />
        </Button>
        <Button variant='ghost' size='icon' style={styles.controlButton}>
          <SkipBack size={18} color='#666' />
        </Button>
        <View style={styles.spacer} />
        <Button variant='ghost' size='icon' style={styles.controlButton}>
          <SkipForward size={18} color='#666' />
        </Button>
        <Button variant='ghost' size='icon' style={styles.controlButton}>
          <Shuffle size={18} color='#666' />
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  musicPlayer: {
    backgroundColor: '#F2F2F7',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  albumArtContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  albumArt: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  trackInfo: {
    alignItems: 'center',
    marginBottom: 12,
  },
  trackTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#1a1a1a',
  },
  artistName: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  actionButton: {
    width: 36,
    height: 36,
  },
  playerContainer: {
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0,
    marginBottom: 16,
  },
  additionalControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  controlButton: {
    width: 36,
    height: 36,
  },
  spacer: {
    width: 40,
  },
});
