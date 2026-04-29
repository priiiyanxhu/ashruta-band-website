import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: number;
  url: string;
}

interface EnhancedMusicPlayerProps {
  tracks: Track[];
}

export default function EnhancedMusicPlayer({ tracks }: EnhancedMusicPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {
        // Handle autoplay restrictions
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleTrackEnd = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      setCurrentTrackIndex(0);
    }
    setIsPlaying(true);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handlePrevious = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    } else {
      setCurrentTrackIndex(tracks.length - 1);
    }
    setCurrentTime(0);
  };

  const handleNext = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      setCurrentTrackIndex(0);
    }
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    if (!isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
      />

      {/* Now Playing Card */}
      <div className="bg-gradient-to-br from-red-900/20 to-black/40 border border-red-500/30 rounded-lg p-6 mb-6 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-900 rounded-lg flex items-center justify-center">
            <Music className="w-8 h-8 text-red-300" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white">{currentTrack.title}</h3>
            <p className="text-red-400">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max={currentTrack.duration}
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(currentTrack.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={handlePrevious}
            className="p-2 hover:bg-red-600/20 rounded-full transition-colors"
            title="Previous track"
          >
            <SkipBack className="w-5 h-5 text-red-400" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white ml-0.5" />
            )}
          </button>

          <button
            onClick={handleNext}
            className="p-2 hover:bg-red-600/20 rounded-full transition-colors"
            title="Next track"
          >
            <SkipForward className="w-5 h-5 text-red-400" />
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <Volume2 className="w-5 h-5 text-red-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-600"
              title="Volume"
            />
          </div>
        </div>
      </div>

      {/* Playlist */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">Playlist</h4>
        {tracks.map((track, index) => (
          <button
            key={track.id}
            onClick={() => {
              setCurrentTrackIndex(index);
              setCurrentTime(0);
              setIsPlaying(true);
            }}
            className={`w-full p-3 rounded-lg transition-all text-left ${
              index === currentTrackIndex
                ? 'bg-red-600/30 border border-red-500 text-white'
                : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{track.title}</p>
                <p className="text-xs opacity-75">{track.artist}</p>
              </div>
              <span className="text-xs opacity-75">{formatTime(track.duration)}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
