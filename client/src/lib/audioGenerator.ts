/**
 * Generate placeholder audio tracks using Web Audio API
 * These can be easily replaced with real audio files later
 */

export interface GeneratedTrack {
  id: number;
  title: string;
  artist: string;
  duration: number;
  url: string;
}

/**
 * Generate a simple sine wave tone for demo purposes
 */
function generateTone(
  frequency: number,
  duration: number,
  sampleRate: number = 44100
): AudioBuffer {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < buffer.length; i++) {
    data[i] = Math.sin((2 * Math.PI * frequency * i) / sampleRate) * 0.3;
  }

  return buffer;
}

/**
 * Convert AudioBuffer to WAV blob
 */
function audioBufferToWav(audioBuffer: AudioBuffer): Blob {
  const numberOfChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;

  const bytesPerSample = bitDepth / 8;
  const blockAlign = numberOfChannels * bytesPerSample;

  const channelData: Float32Array[] = [];
  for (let i = 0; i < numberOfChannels; i++) {
    channelData.push(audioBuffer.getChannelData(i));
  }

  const length = audioBuffer.length * numberOfChannels * bytesPerSample;
  const arrayBuffer = new ArrayBuffer(44 + length);
  const view = new DataView(arrayBuffer);

  // WAV header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + length, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numberOfChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeString(36, 'data');
  view.setUint32(40, length, true);

  // Audio data
  let offset = 44;
  const volume = 0.8;
  for (let i = 0; i < audioBuffer.length; i++) {
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const sample = Math.max(-1, Math.min(1, channelData[channel][i])) * volume;
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
      offset += 2;
    }
  }

  return new Blob([arrayBuffer], { type: 'audio/wav' });
}

/**
 * Generate placeholder audio tracks with metal-themed names
 */
export function generatePlaceholderTracks(): GeneratedTrack[] {
  const tracks = [
    {
      id: 1,
      title: 'Agni Raag (Fire Melody)',
      artist: 'Ashruta the Band',
      duration: 4 * 60 + 32, // 4:32
      frequencies: [440, 494, 523, 587], // A, B, C, D notes
    },
    {
      id: 2,
      title: 'Dhwani of Destruction',
      artist: 'Ashruta the Band',
      duration: 5 * 60 + 18, // 5:18
      frequencies: [330, 370, 415, 466], // E, F#, G#, A# notes
    },
    {
      id: 3,
      title: 'Tandav Metal',
      artist: 'Ashruta the Band',
      duration: 6 * 60 + 5, // 6:05
      frequencies: [246, 277, 311, 349], // B, C#, D#, F notes
    },
    {
      id: 4,
      title: 'Bollywood Inferno',
      artist: 'Ashruta the Band',
      duration: 4 * 60 + 47, // 4:47
      frequencies: [392, 440, 494, 523], // G, A, B, C notes
    },
    {
      id: 5,
      title: 'Raga of the Fallen',
      artist: 'Ashruta the Band',
      duration: 5 * 60 + 55, // 5:55
      frequencies: [293, 330, 370, 415], // D, E, F#, G# notes
    },
  ];

  return tracks.map((track) => ({
    ...track,
    url: '#placeholder', // Placeholder URL - will be replaced with real audio
  }));
}

/**
 * Create a data URL for a placeholder audio track
 * This allows the player to work without real audio files
 */
export function createPlaceholderAudioUrl(duration: number): string {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const buffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    // Create a simple tone pattern
    for (let i = 0; i < buffer.length; i++) {
      const t = i / audioContext.sampleRate;
      // Combine multiple frequencies for a richer sound
      const freq1 = 440 * Math.sin(2 * Math.PI * t);
      const freq2 = 220 * Math.sin(2 * Math.PI * t * 0.5);
      data[i] = (freq1 + freq2) * 0.1;
    }

    const wav = audioBufferToWav(buffer);
    return URL.createObjectURL(wav);
  } catch (error) {
    console.error('Error creating placeholder audio:', error);
    return '';
  }
}

/**
 * Replace placeholder audio URLs with real audio files
 */
export function replacePlaceholderTracks(
  tracks: GeneratedTrack[],
  audioUrls: Record<number, string>
): GeneratedTrack[] {
  return tracks.map((track) => ({
    ...track,
    url: audioUrls[track.id] || track.url,
  }));
}
